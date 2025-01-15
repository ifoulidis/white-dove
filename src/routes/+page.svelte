<script lang="ts">
  import TestimonialCard from '$lib/components/TestimonialCard.svelte'
  import Dad from '$lib/images/Dad1.jpg?enhanced'
  import Dad2 from '$lib/images/Dad2.jpg?enhanced'
  import Dad3 from '$lib/images/Dad3.jpg?enhanced'
  import Painting from '$lib/images/ai-image.jpg?enhanced'
  import { Button } from 'flowbite-svelte'
  import { MobilePhoneSolid } from 'flowbite-svelte-icons'
  import { fade, fly } from 'svelte/transition'
  // import { animate, scroll } from 'motion'
  import IntersectionObserver from 'svelte-intersection-observer'

  let scroll = $state(0)
  let windowSize = $state(0)
  let scrollProportion = $derived(windowSize && scroll ? scroll / windowSize : 0)
  $inspect(scrollProportion)
  let servicesRef: HTMLElement | null | undefined = $state()
  let quoteRef: HTMLElement | null | undefined = $state()
  let intersecting: { services: boolean; quote: boolean } = $state({
    services: false,
    quote: false,
  })
</script>

<svelte:window bind:scrollY={scroll} bind:innerHeight={windowSize} />

<section class="overflow-x-hidden bg-white px-8 py-12">
  <!-- Hero Section -->
  <div
    class="mb-10 flex max-h-screen flex-col-reverse items-center gap-8 lg:mx-auto lg:max-w-[70%] lg:flex-row lg:pb-[10rem]"
  >
    <!-- Text Content -->
    <div class="space-y-10 text-left lg:w-1/2">
      <div class="hero-title text-[3rem] font-bold lg:text-[4rem]">
        <h1 class="text-secondary" transition:fade={{ delay: 300 }}>Excellence &</h1>
        <h1 class="-mt-5 ml-5 text-brand" transition:fade={{ delay: 500 }}>Experience</h1>
        <h3 class="text-lg text-secondary">
          Levelling up homes and businesses in Matamata for 25 years
        </h3>
      </div>

      <div class="flex justify-end">
        <Button href="#quote" class="bg-brand px-6 py-3 text-lg text-white hover:bg-blue-600"
          >Book a Quote</Button
        >
      </div>
    </div>
    <!-- Image -->
    <div class="relative h-[50vh] w-full lg:h-[70vh] lg:w-1/2 lg:px-5">
      <enhanced:img
        style:transform="translateX({-(scrollProportion * 50)}px)"
        src={Dad}
        alt="Phillip painting a door"
        class="hero-img-1 absolute -left-5 bottom-0 z-20 mx-auto rounded-lg shadow-lg lg:left-0"
      />
      <enhanced:img
        style:transform="translateX({scrollProportion * 50}px)"
        src={Dad2}
        alt="Phillip painting a door"
        class="hero-img-2 absolute top-10 ml-[20%] rounded-lg shadow-lg"
      />
      <enhanced:img
        style:transform="translateY({-(scrollProportion * 50)}px)"
        src={Dad3}
        alt="Phillip painting a door"
        class="hero-img-3 absolute bottom-10 z-10 ml-[40%] rounded-lg shadow-lg"
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
    <IntersectionObserver element={servicesRef} bind:intersecting={intersecting.services}>
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

<section class="relative mt-20 flex w-full flex-col py-20 lg:h-[75vh] lg:flex-row">
  <div
    class="h-[50vh] w-full bg-cover bg-center lg:h-auto lg:w-1/2"
    style="background-image: url('/images/ai-kitchen.jpg');"
  ></div>
  <!-- Quote Details Section -->
  <IntersectionObserver element={quoteRef} bind:intersecting={intersecting.quote}>
    <div
      class="min-h-30 h-max bg-[#ABE1FA] p-8 text-gray-600 lg:mt-10 lg:w-1/2 lg:justify-start"
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
        <a class="flex gap-2 text-white" href="tel:+642106061821" transition:fade={{ delay: 300 }}
          ><MobilePhoneSolid size="lg" /> 02106061821</a
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
    max-height: 70%;
    width: var(--size);
  }
  .hero-img-2,
  .hero-img-3 {
    max-height: 50%;
    width: var(--size);
  }
  @media screen and (max-width: 760px) {
    .hero-img-1 {
      max-height: 300px;
      width: var(--size);
    }
    .hero-img-2,
    .hero-img-3 {
      max-height: 200px;
      width: var(--size);
    }
  }
</style>
