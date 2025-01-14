<script>
  import { fly } from 'svelte/transition'
</script>

<div class="mt-10 space-y-5 px-5 lg:mx-auto lg:w-1/3">
  <h1 class="text-4xl">About</h1>
  <p transition:fly={{ delay: 200 }}>
    Owner Phillip Foulidis went into the trade at 15 and immediately set about learning from the
    best: he took wallpapering tips from the best wallpaperers, tips on painting doors from the best
    at that, and so forth.
  </p>

  <p transition:fly={{ delay: 400 }}>
    After being a foreman and working for a number of companies in Wellington, Phillip went out on
    his own, and in 1999, he moved to Matamata with his young family and set up shop, where he has
    been ever since.
  </p>
</div>
