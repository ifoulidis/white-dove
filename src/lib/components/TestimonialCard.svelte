<script>
  import { fade } from 'svelte/transition'

  let { author, highlight, quote } = $props()
</script>

<div
  class="flex flex-col items-center justify-between border-2 border-gray-200 p-5"
  transition:fade
>
  <blockquote class="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
      {highlight}
    </h3>
    <p class="my-4 font-light italic">
      "{quote}"
    </p>
  </blockquote>
  <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
    <p>{author}</p>
  </div>
</div>
