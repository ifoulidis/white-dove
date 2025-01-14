<script lang="ts">
  import '../app.css'
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import Logo from '$lib/images/logo.jpg'
  import '@fontsource/libre-baskerville'

  let { children } = $props()
</script>

<Navbar class="sticky start-0 top-0 z-50 w-full border-b px-2 py-2.5 sm:px-4">
  <NavBrand href="/">
    <img src={Logo} alt="Company logo of a dove." width={100} height={100} />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >White Dove Painting</span
    ></NavBrand
  >
  <NavHamburger />
  <NavUl activeClass="text-brand">
    <NavLi href="/about" class="hover:text-brand px-7 text-xl">About</NavLi>
    <NavLi href="/#quote" class="hover:text-brand px-7 text-xl">Get a Quote</NavLi>
    <NavLi href="tel:+642106061821" class="hover:text-brand px-7 text-xl">0216061821</NavLi>
  </NavUl>
</Navbar>

{@render children?.()}

<style>
  :global(body) {
    font-family: 'Libre Baskerville', serif;
  }
</style>
