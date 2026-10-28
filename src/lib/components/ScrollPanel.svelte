<script lang="ts">
  import { scrollProgress } from '$lib/actions/scrollProgress'

  let {
    from = 'left',
    class: className = 'bg-gray-50',
  }: { from?: 'left' | 'right'; class?: string } = $props()
</script>

<!-- Decorative background that slides in from one side; place inside a `relative` section -->
<div
  class="scroll-panel {className}"
  class:from-right={from === 'right'}
  use:scrollProgress
  aria-hidden="true"
></div>

<style>
  .scroll-panel {
    --progress: 1;
    position: absolute;
    inset-block: 0;
    left: 0;
    z-index: -1;
    /* Stops short of the far edge: a sliver on phones, ~3rem past the content on wide screens */
    width: min(calc(100% - 0.5rem), calc(50% + 36rem + 3rem));
    border-radius: 0 2.5rem 2.5rem 0;
    transform: translateX(calc((var(--progress) - 1) * 100%));
    will-change: transform;
  }

  .from-right {
    left: auto;
    right: 0;
    border-radius: 2.5rem 0 0 2.5rem;
    transform: translateX(calc((1 - var(--progress)) * 100%));
  }
</style>
