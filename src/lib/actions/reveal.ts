// Fades an element in the first time it scrolls into view.
// Content is server-rendered and visible by default; the hidden state is only applied here.
export function reveal(node: HTMLElement, delay = 0) {
  node.style.setProperty('--reveal-delay', `${delay}ms`)
  node.classList.add('reveal')

  const observer = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        node.classList.add('revealed')
        observer.disconnect()
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  observer.observe(node)

  return {
    destroy: () => observer.disconnect(),
  }
}
