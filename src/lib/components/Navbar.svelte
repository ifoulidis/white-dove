<script lang="ts">
  import Logo from '$lib/images/logo-wordmark.png'
  import { PhoneSolid } from 'flowbite-svelte-icons'
</script>

<header class="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur">
  <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
    <a href="/" class="shrink-0">
      <img
        src={Logo}
        alt="White Dove Professional Painting"
        width={455}
        height={138}
        class="h-auto w-40 sm:w-52"
      />
    </a>
    <a
      href="tel:+64276061821"
      class="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 px-4 text-sm font-medium text-gray-800 transition-colors hover:border-brand-dark hover:text-brand-dark"
    >
      <PhoneSolid class="h-4 w-4 text-brand-dark" />
      <span class="sm:hidden">Call</span>
      <span class="hidden sm:inline">027 606 1821</span>
    </a>
  </nav>
</header>
