<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte'
  import '../app.css'
  import '@fontsource/libre-baskerville'

  let { children } = $props()
</script>

<Navbar />

{@render children?.()}

<style>
  :global(body) {
    font-family: 'Libre Baskerville', serif;
    scroll-behavior: smooth;
    --webkit-scroll-behavior: smooth;
    scroll-margin-top: 200px;
  }
</style>
