import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      runtime: 'nodejs22.18',
    }),

    alias: {
      $lib: 'src/lib',
      $utility: 'src/lib/utility',
      $components: 'src/lib/components',
      $trpc: 'src/lib/trpc',
      $zod: 'prisma/generated/zod',
    },
  },
}

export default config
