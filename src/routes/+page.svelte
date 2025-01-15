<script lang="ts">
  import TestimonialCard from '$lib/components/TestimonialCard.svelte'
  import Dad from '$lib/images/Dad1.jpg?enhanced'
  import Painting from '$lib/images/ai-image.jpg?enhanced'
  import { Button } from 'flowbite-svelte'
  import { MobilePhoneSolid } from 'flowbite-svelte-icons'
  import { fade, fly } from 'svelte/transition'
  // import { animate, scroll } from 'motion'
  import IntersectionObserver from 'svelte-intersection-observer'

  let scroll = $state(0)
  let windowHeight = $state(0)
  let windowWidth = $state(0)
  let scrollProportion = $derived(windowHeight && scroll ? scroll / windowHeight : 0)
  $inspect(scrollProportion)
  let servicesRef: HTMLElement | null | undefined = $state()
  let quoteRef: HTMLElement | null | undefined = $state()
  let intersecting: { services: boolean; quote: boolean } = $state({
    services: false,
    quote: false,
  })
</script>

<svelte:window
  bind:scrollY={scroll}
  bind:innerHeight={windowHeight}
  bind:innerWidth={windowWidth}
/>

<section class="overflow-hidden bg-white pb-12 md:py-12">
  <!-- Hero Section -->
  <div
    class="mb-10 flex h-[670px] w-full flex-col-reverse items-center justify-evenly gap-8 md:h-max md:max-h-screen lg:mx-auto lg:flex-row lg:pb-[10rem]"
  >
    <!-- Text Content -->
    <div class="h-1/2 space-y-10 px-8 text-left md:h-max lg:ml-auto lg:h-full lg:w-1/3">
      <div class="hero-title text-4xl md:text-[3rem] lg:space-y-8 lg:text-[4rem]">
        <h1 class="font-bold text-gray-500 md:text-left" transition:fade={{ delay: 300 }}>
          Excellence &
        </h1>
        <h1 class="mb-4 ml-2 mt-2 text-brand md:ml-5 md:text-left" transition:fade={{ delay: 500 }}>
          Experience
        </h1>
        <h3 class="text-lg text-gray-500">
          Making homes and businesses shine in Matamata for 25 years!
        </h3>
      </div>

      <div class="flex justify-end">
        <Button href="#quote" class="bg-brand px-6 py-3 text-lg text-white hover:bg-blue-600"
          >Book a Quote</Button
        >
      </div>
    </div>
    <!-- Image -->
    <div class="h-auto lg:h-[70vh] lg:w-1/2 lg:px-5">
      <enhanced:img
        style:transform="translateX({windowWidth > 760 ? scrollProportion * 50 : 0}px)"
        src={Dad}
        alt="Phillip painting a door"
        class="hero-img-1 mx-auto h-full shadow-lg lg:rounded-bl-lg lg:rounded-br-[25%] lg:rounded-tl-[25%] lg:rounded-tr-lg"
      />
    </div>
  </div>
</section>
<!-- Services Section -->

<section
  class="relative flex flex-col-reverse rounded-bl-full rounded-tr-full bg-gray-100 p-0 lg:flex-row-reverse lg:pr-8 lg:text-gray-600"
>
  <div class="m-auto flex h-max flex-col p-4 lg:w-1/2" id="sevices">
    <h1 class="my-6 flex justify-center text-[3rem] font-bold text-gray-900">Services</h1>
    <IntersectionObserver once element={servicesRef} bind:intersecting={intersecting.services}>
      <div class="mx-auto mt-auto grid grid-cols-2 gap-4" bind:this={servicesRef}>
        {#if intersecting.services}
          <div
            transition:fade={{ delay: 100 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Commercial and Residential</h2>
            <p class="text-sm text-gray-500">
              Comprehensive painting solutions for homes and businesses.
            </p>
          </div>
          <div
            transition:fade={{ delay: 200 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Interior and Exterior Painting</h2>
            <p class="text-sm text-gray-500">
              Expert painting services for both indoor and outdoor spaces.
            </p>
          </div>
          <div
            transition:fade={{ delay: 300 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Spraying</h2>
            <p class="text-sm text-gray-500">
              Efficient and even paint application for any surface.
            </p>
          </div>
          <div
            transition:fade={{ delay: 400 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Wallpapering</h2>
            <p class="text-sm text-gray-500">
              Professional wallpaper installation for a polished finish.
            </p>
          </div>
          <div
            transition:fade={{ delay: 500 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Low-Dust Sanding System</h2>
            <p class="text-sm text-gray-500">Minimizing mess during surface preparation.</p>
          </div>
          <div
            transition:fade={{ delay: 600 }}
            class="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <h2 class="mb-3 text-xl font-semibold text-gray-700">Plastering</h2>
            <p class="text-sm text-gray-500">
              Smooth and seamless plastering for walls and ceilings.
            </p>
          </div>
        {/if}
      </div>
    </IntersectionObserver>
  </div>

  <div class="mr-auto h-max p-0 lg:w-1/2">
    <enhanced:img src={Painting} alt="Phillip painting a door" class="rounded-bl-full" />
  </div>
</section>

<section
  class="relative flex w-full flex-col overflow-hidden py-20 lg:mt-20 lg:h-[75vh] lg:flex-row"
>
  <div
    class="h-[50vh] w-full bg-cover bg-center lg:h-auto lg:w-1/2"
    style="background-image: url('/images/ai-kitchen.jpg');"
  ></div>
  <!-- Quote Details Section -->
  <IntersectionObserver once element={quoteRef} bind:intersecting={intersecting.quote}>
    <div
      class="h-max bg-[#ABE1FA] p-8 text-gray-600 lg:mt-10 lg:w-1/2 lg:justify-start"
      id="quote"
      bind:this={quoteRef}
    >
      {#if intersecting.quote}
        <h1 class="pb-3 text-4xl font-bold" transition:fly={{ x: 300, delay: 100 }}>
          Ready to Make It Beautiful?
        </h1>
        <h1 class="flex gap-1 pb-3 text-xl" transition:fly={{ x: -300 }}>Book a quote today</h1>
        <p class="pb-3" transition:fade={{ delay: 300 }}>
          Our quotes are free, detailed, and don't leave any hidden costs.
        </p>
        <a
          class="flex gap-2 font-semibold"
          href="tel:+642106061821"
          transition:fade={{ delay: 300 }}><MobilePhoneSolid size="lg" /> 0276061821</a
        >
      {/if}
    </div>
  </IntersectionObserver>
</section>
<section class="bg-white px-8 py-20">
  <h1 class="mb-10 text-center text-4xl text-gray-900">What Clients Say...</h1>
  <div class="mx-auto flex w-4/5 flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-2">
    <TestimonialCard
      highlight="Absolutely thrilled with the results!"
      quote="Absolutely thrilled with the results! The team was professional, efficient, and left
              my home looking brand new. Highly recommend!"
      author="Bonnie Green"
    />
    <TestimonialCard
      highlight="The quality speaks for itself."
      quote="Great service from start to finish. They worked quickly, kept everything clean, and the quality speaks for itself."
      author="Michael L."
    />
    <TestimonialCard
      highlight="The workmanship is top-notch."
      quote="I never thought my old living room could look this good. The colors they helped me choose are perfect, and the workmanship is top-notch."
      author="Emily R."
    />
  </div>
</section>

<style>
  .hero-img-1 {
    max-height: 100%;
    width: var(--size);
  }
</style>
