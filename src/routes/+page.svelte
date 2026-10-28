<script lang="ts">
  import { reveal } from '$lib/actions/reveal'
  import ScrollPanel from '$lib/components/ScrollPanel.svelte'
  import TestimonialCard from '$lib/components/TestimonialCard.svelte'
  import DadAndAmos from '$lib/images/amos and dad not blurry.jpg?enhanced'
  import FB from '$lib/images/messenger.png'
  import Painting from '$lib/images/ai-image.jpg?enhanced'
  import { MobilePhoneSolid } from 'flowbite-svelte-icons'

  let scroll = $state(0)
  let windowHeight = $state(0)
  let windowWidth = $state(0)
  let scrollProportion = $derived(windowHeight && scroll ? scroll / windowHeight : 0)

  const services = [
    {
      title: 'Commercial & Residential',
      description: 'Comprehensive painting solutions for homes and businesses.',
    },
    {
      title: 'Interior & Exterior Painting',
      description: 'Expert painting services for both indoor and outdoor spaces.',
    },
    {
      title: 'Spraying',
      description: 'Efficient and even paint application for new builds, roofs, etc.',
    },
    {
      title: 'Wallpapering',
      description: 'Professional wallpaper installation for a polished finish.',
    },
    {
      title: 'Low-Dust Sanding',
      description: 'Minimising mess during surface preparation.',
    },
    {
      title: 'Plaster Repair',
      description: 'When you need a little plastering, White Dove has you sorted.',
    },
  ]
</script>

<svelte:window
  bind:scrollY={scroll}
  bind:innerHeight={windowHeight}
  bind:innerWidth={windowWidth}
/>

<main class="space-y-8 pb-8 lg:space-y-12 lg:pb-12">
  <!-- Hero -->
  <section class="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:pb-24 lg:pt-16">
    <div class="flex flex-col gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
      <div class="lg:w-1/2">
        <enhanced:img
          style:transform="translateX({windowWidth >= 1024 ? scrollProportion * 50 : 0}px)"
          src={DadAndAmos}
          alt="Phillip and Amos standing beside the White Dove van"
          class="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg lg:aspect-auto lg:rounded-bl-lg lg:rounded-br-[25%] lg:rounded-tl-[25%] lg:rounded-tr-lg"
        />
      </div>

      <div class="lg:w-1/2">
        <p class="eyebrow">Professional painting · Matamata</p>
        <h1 class="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Excellence &amp;<br />
          <span class="font-normal italic text-brand-dark">Experience</span>
        </h1>
        <p class="mt-5 max-w-md text-lg leading-relaxed text-gray-600">
          Making homes and businesses shine in Matamata for 25 years.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#quote" class="btn-primary">Book a free quote</a>
          <a href="tel:+64276061821" class="btn-secondary">
            <MobilePhoneSolid class="h-5 w-5 text-brand-dark" />
            027 606 1821
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section id="services" class="relative isolate overflow-x-clip py-16 lg:py-24">
    <ScrollPanel from="left" />
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div class="max-w-xl">
          <p class="eyebrow">Services</p>
          <h2 class="mt-3 text-2xl sm:text-3xl">What we can do for you</h2>
        </div>
        <p class="mt-3 max-w-md text-gray-600 lg:mt-0">
          From a single room to a full commercial job, every surface is prepared and finished
          properly.
        </p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {#each services as service, i}
          <div
            use:reveal={i * 60}
            class="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-6"
          >
            <div class="mb-3 h-1 w-8 rounded-full bg-brand sm:mb-4"></div>
            <h3 class="text-lg">{service.title}</h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Quote -->
  <section class="relative isolate overflow-x-clip py-16 lg:py-24">
    <ScrollPanel from="right" class="bg-brand-light" />
    <div class="mx-auto grid max-w-6xl px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch">
      <div
        class="aspect-[4/3] rounded-t-2xl bg-cover bg-center lg:aspect-auto lg:rounded-l-2xl lg:rounded-tr-none"
        style="background-image: url('/images/ai-kitchen.jpg');"
        role="img"
        aria-label="Bright white kitchen with flowers on the bench"
      ></div>
      <div
        id="quote"
        class="rounded-b-2xl bg-white p-6 shadow-sm sm:p-10 lg:rounded-r-2xl lg:rounded-bl-none lg:p-14"
        use:reveal
      >
        <p class="eyebrow">Free quotes</p>
        <h2 class="mt-3 text-2xl sm:text-3xl">
          Ready to <span class="italic text-brand-dark">make it shine</span>?
        </h2>
        <p class="mt-4 leading-relaxed text-gray-600">
          Our quotes are free, detailed, and don't leave any hidden costs.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href="tel:+64276061821" class="btn-primary">
            <MobilePhoneSolid class="h-5 w-5" />
            Call 027 606 1821
          </a>
          <a
            href="https://m.me/WhiteDoveMatamata"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
          >
            <img src={FB} width={20} height={20} alt="" class="h-5 w-5" />
            Message on Messenger
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="relative isolate overflow-x-clip py-16 lg:py-24">
    <ScrollPanel from="left" />
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="eyebrow">Testimonials</p>
      <h2 class="mt-3 text-2xl sm:text-3xl">What clients say</h2>
      <div class="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
        <TestimonialCard
          highlight="Great paint job!"
          quote="Great paint job. Top class!"
          author="Helen R."
        />
        <TestimonialCard
          highlight="Top class workmanship!"
          quote="Top class workmanship of painting job on our new house!"
          author="Keith Bell"
          delay={80}
        />
        <TestimonialCard
          highlight="Highly recommended!"
          quote="Highly recommended! Painted the exterior and interior of our house."
          author="Judith Peacock"
          delay={160}
        />
      </div>
    </div>
  </section>
</main>

<footer class="border-t border-gray-200 bg-white">
  <div
    class="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-gray-500 sm:flex-row sm:justify-between sm:px-6 sm:text-left"
  >
    <p>© {new Date().getFullYear()} White Dove Professional Painting</p>
    <div class="flex items-center gap-4">
      <a href="/admin/quote" rel="nofollow" data-sveltekit-reload class="hover:text-brand-dark">
        Admin
      </a>
      <span aria-hidden="true" class="text-gray-300">·</span>
      <a
        href="http://ifoulidis.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-brand-dark"
      >
        Site by <span class="text-brand-dark">Isaiah Foulidis</span>
      </a>
    </div>
  </div>
</footer>
