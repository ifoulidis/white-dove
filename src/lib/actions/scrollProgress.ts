// Sets --progress (0 → 1) on an element as its top edge travels from the bottom of the
// viewport to 40% down from the top. Defaults to fully progressed without JS or with reduced motion.
export function scrollProgress(node: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let frame = 0

  const update = () => {
    frame = 0
    const viewport = window.innerHeight
    const linear = (viewport - node.getBoundingClientRect().top) / (viewport * 0.6)
    const clamped = Math.min(Math.max(linear, 0), 1)
    const eased = 1 - Math.pow(1 - clamped, 3)
    node.style.setProperty('--progress', eased.toFixed(4))
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })

  return {
    destroy() {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    },
  }
}
