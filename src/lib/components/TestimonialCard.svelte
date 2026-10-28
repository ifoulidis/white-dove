<script lang="ts">
  import { reveal } from '$lib/actions/reveal'

  let { author, highlight, quote, delay = 0 } = $props()
</script>

<figure
  class="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
  use:reveal={delay}
>
  <span class="mb-2 font-serif text-5xl leading-none text-brand" aria-hidden="true">“</span>
  <blockquote class="flex-1">
    <p class="font-serif text-lg text-gray-900">{highlight}</p>
    <p class="mt-2 leading-relaxed text-gray-600">“{quote}”</p>
  </blockquote>
  <figcaption class="mt-5 text-sm font-medium text-gray-500">— {author}</figcaption>
</figure>
