<script lang="ts">
  import '../app.css'
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import Logo from '$lib/images/F-resized.png'
  import '@fontsource/libre-baskerville'

  let { children } = $props()
</script>

<Navbar class="sticky start-0 top-0 z-50 w-full border-b px-2 py-2.5 sm:px-4">
  <NavBrand href="/">
    <img src={Logo} alt="Company logo of a dove." width={250} height={125} />
  </NavBrand>
  <NavHamburger />
  <NavUl activeClass="text-brand">
    <!-- <NavLi href="/about" class="px-7 text-xl hover:text-brand">About</NavLi> -->
    <NavLi href="tel:+642106061821" class="px-7 text-xl hover:text-brand">0276061821</NavLi>
  </NavUl>
</Navbar>

{@render children?.()}

<style>
  :global(body) {
    font-family: 'Libre Baskerville', serif;
    scroll-behavior: smooth;
    --webkit-scroll-behavior: smooth;
    scroll-margin-top: 200px;
  }
</style>
