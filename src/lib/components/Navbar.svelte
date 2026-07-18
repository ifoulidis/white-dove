<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import Logo from '$lib/images/new-logo.png'
  import { PhoneSolid } from 'flowbite-svelte-icons'
</script>

<Navbar class="sticky start-0 top-0 z-50 w-full bg-gray-50 px-2 py-2.5 sm:px-4">
  <NavBrand href="/">
    <img src={Logo} alt="Company logo of a dove." width={250} height={125} />
  </NavBrand>
  <NavHamburger />
  <NavUl activeClass="text-brand">
    <!-- <NavLi href="/about" class="px-7 text-xl hover:text-brand">About</NavLi> -->
    <NavLi
      href="tel:+64276061821"
      class="flex items-center gap-2 px-7 text-lg font-extralight hover:text-brand"
      ><PhoneSolid class="text-brand" /> 0276061821</NavLi
    >
  </NavUl>
</Navbar>
