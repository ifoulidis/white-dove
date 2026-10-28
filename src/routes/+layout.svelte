<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte'
  import '../app.css'
  import '@fontsource/libre-baskerville/400.css'
  import '@fontsource/libre-baskerville/400-italic.css'
  import '@fontsource/libre-baskerville/700.css'

  let { children } = $props()
</script>

<Navbar />

{@render children?.()}
