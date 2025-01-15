<script>
  import TestimonialCard from '$lib/components/TestimonialCard.svelte'
  import Dad from '$lib/images/Dad1.jpg?enhanced'
  import Dad2 from '$lib/images/Dad2.jpg?enhanced'
  import Dad3 from '$lib/images/Dad3.jpg?enhanced'
  import Painting from '$lib/images/ai-image.jpg?enhanced'
  import { Button, Card } from 'flowbite-svelte'
  import { MobilePhoneSolid } from 'flowbite-svelte-icons'
</script>

<section class="bg-white px-8 py-12">
  <!-- Hero Section -->
  <div
    class="mb-10 flex max-h-screen flex-col-reverse items-center gap-8 lg:mx-auto lg:max-w-[70%] lg:flex-row lg:pb-[10rem]"
  >
    <!-- Text Content -->
    <div class="space-y-10 text-left lg:w-1/2">
      <div class="hero-title text-[3rem] font-bold lg:text-[4rem]">
        <h1 class="text-secondary">Excellence &</h1>
        <h1 class="-mt-5 ml-5">
          <span class="text-brand">Experience</span>
        </h1>
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
        src={Dad}
        alt="Phillip painting a door"
        class="hero-img-1 absolute -left-5 bottom-0 z-20 mx-auto rounded-lg shadow-lg lg:left-0"
      />
      <enhanced:img
        src={Dad2}
        alt="Phillip painting a door"
        class="hero-img-2 absolute top-10 ml-[20%] rounded-lg shadow-lg"
      />
      <enhanced:img
        src={Dad3}
        alt="Phillip painting a door"
        class="hero-img-3 absolute bottom-10 z-10 ml-[40%] rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
<!-- Services Section -->
<section
  class="flex flex-col-reverse rounded-bl-full rounded-tr-full bg-gray-100 p-0 lg:flex-row-reverse lg:pr-8 lg:text-gray-600"
>
  <div class="m-auto flex h-max flex-col lg:w-1/2">
    <h1 class="my-6 flex justify-center text-[3rem] font-bold text-gray-900">Services</h1>
    <div class="mx-auto mt-auto grid grid-cols-2 gap-2">
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Commercial and Residential</h2>
      </Card>
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Interior and Exterior Painting</h2>
      </Card>
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Spraying</h2>
      </Card>
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Wallpapering</h2>
      </Card>
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Low-Dust Sanding System</h2>
      </Card>
      <Card class="flex items-center justify-center bg-white text-center">
        <h2 class="mb-3 text-gray-700">Plastering</h2>
      </Card>
    </div>
  </div>
  <div class="mr-auto h-max p-0 lg:w-1/2">
    <enhanced:img src={Painting} alt="Phillip painting a door" class="rounded-bl-full" />
  </div>
</section>
<section class="relative mt-20 flex h-[75vh] w-full flex-col py-20 lg:flex-row">
  <div
    class="w-full bg-cover bg-center lg:w-1/2"
    style="background-image: url('/images/ai-kitchen.jpg');"
  ></div>
  <!-- Quote Details Section -->
  <div class="mt-10 h-max bg-[#ABE1FA] p-8 text-gray-600 lg:w-1/2 lg:justify-start" id="quote">
    <h1 class="pb-3 text-4xl font-bold">Ready to Make It Beautiful?</h1>
    <h1 class="flex gap-1 pb-3 text-xl">Book a quote today</h1>
    <p class="pb-3">Our quotes are free, detailed, and don't leave any hidden costs.</p>
    <h3 class="flex gap-2">
      <MobilePhoneSolid size="lg" />
      <a href="tel:+642106061821" class="text-white">02106061821</a>
    </h3>
  </div>
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
