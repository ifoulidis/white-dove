import type { Handle } from '@sveltejs/kit'
import { createHash, timingSafeEqual } from 'node:crypto'

import { env } from '$env/dynamic/private'

// Hash first so both sides are the same length for timingSafeEqual
const digest = (value: string) => createHash('sha256').update(value).digest()
const safeEqual = (a: string, b: string) => timingSafeEqual(digest(a), digest(b))

function isAuthorised(header: string | null) {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = env
  // Fail closed if the credentials aren't configured
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !header?.startsWith('Basic ')) return false

  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8')
  const separator = decoded.indexOf(':')
  if (separator === -1) return false

  // Check both without short-circuiting so timing doesn't reveal which one was wrong
  const usernameMatches = safeEqual(decoded.slice(0, separator), ADMIN_USERNAME)
  const passwordMatches = safeEqual(decoded.slice(separator + 1), ADMIN_PASSWORD)
  return usernameMatches && passwordMatches
}

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url
  if (pathname !== '/admin' && !pathname.startsWith('/admin/')) return resolve(event)

  if (!isAuthorised(event.request.headers.get('authorization'))) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="White Dove admin", charset="UTF-8"' },
    })
  }

  const response = await resolve(event)
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}
