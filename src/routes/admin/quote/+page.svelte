<script lang="ts">
  import { downloadQuotePdf } from '$lib/quote/pdf'
  import { formatMoney, GST_RATE, lineTotal, newQuote, quoteTotals } from '$lib/quote/quote'

  let quote = $state(newQuote())
  let totals = $derived(quoteTotals(quote))
  let generating = $state(false)
  let error = $state('')

  function addItem() {
    quote.items.push({ description: '', quantity: 1, unitPrice: 0 })
  }

  function removeItem(index: number) {
    quote.items.splice(index, 1)
  }

  function startOver() {
    if (confirm('Clear this quote and start a new one?')) quote = newQuote()
  }

  async function generate(event: SubmitEvent) {
    event.preventDefault()
    generating = true
    error = ''
    try {
      await downloadQuotePdf($state.snapshot(quote))
    } catch (cause) {
      console.error(cause)
      error = 'The PDF could not be generated. Please try again.'
    } finally {
      generating = false
    }
  }
</script>

<svelte:head>
  <title>Generate a Quote · White Dove</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:pt-12">
  <div class="flex items-end justify-between gap-4">
    <div>
      <p class="eyebrow">Admin</p>
      <h1 class="mt-2 text-2xl sm:text-3xl">Generate a quote</h1>
    </div>
    <button type="button" class="text-sm text-gray-500 hover:text-brand-dark" onclick={startOver}>
      Start over
    </button>
  </div>

  <form class="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start" onsubmit={generate}>
    <div class="space-y-6">
      <fieldset class="rounded-xl border border-gray-200 p-4 sm:p-6">
        <legend class="px-1 font-serif text-lg text-gray-900">Quote details</legend>
        <div class="grid gap-4 sm:grid-cols-3">
          <label>
            <span class="field-label">Quote number</span>
            <input class="input" type="text" bind:value={quote.number} required />
          </label>
          <label>
            <span class="field-label">Date issued</span>
            <input class="input" type="date" bind:value={quote.date} required />
          </label>
          <label>
            <span class="field-label">Valid until</span>
            <input class="input" type="date" bind:value={quote.validUntil} />
          </label>
        </div>
      </fieldset>

      <fieldset class="rounded-xl border border-gray-200 p-4 sm:p-6">
        <legend class="px-1 font-serif text-lg text-gray-900">Client</legend>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="sm:col-span-2">
            <span class="field-label">Name</span>
            <input
              class="input"
              type="text"
              bind:value={quote.client.name}
              autocomplete="off"
              required
            />
          </label>
          <label>
            <span class="field-label">Email</span>
            <input class="input" type="email" bind:value={quote.client.email} autocomplete="off" />
          </label>
          <label>
            <span class="field-label">Phone</span>
            <input class="input" type="tel" bind:value={quote.client.phone} autocomplete="off" />
          </label>
          <label class="sm:col-span-2">
            <span class="field-label">Address</span>
            <textarea class="input" rows="2" bind:value={quote.client.address}></textarea>
          </label>
          <label class="sm:col-span-2">
            <span class="field-label">
              Job site <span class="font-normal text-gray-400">(if different from address)</span>
            </span>
            <input class="input" type="text" bind:value={quote.jobSite} />
          </label>
        </div>
      </fieldset>

      <fieldset class="rounded-xl border border-gray-200 p-4 sm:p-6">
        <legend class="px-1 font-serif text-lg text-gray-900">Work</legend>
        <p class="text-sm text-gray-500">Enter prices excluding GST.</p>

        <ul class="mt-4 space-y-4">
          {#each quote.items as item, i (item)}
            <li
              class="grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 sm:grid-cols-[1fr_5rem_8rem_7rem_auto] sm:items-end sm:bg-transparent sm:p-0"
            >
              <label class="col-span-2 sm:col-span-1">
                <span class={i > 0 ? 'field-label sm:sr-only' : 'field-label'}>Description</span>
                <input
                  class="input"
                  type="text"
                  bind:value={item.description}
                  placeholder="e.g. Exterior weatherboards, two coats"
                  required
                />
              </label>
              <label>
                <span class={i > 0 ? 'field-label sm:sr-only' : 'field-label'}>Qty</span>
                <input
                  class="input text-right"
                  type="number"
                  min="0"
                  step="any"
                  inputmode="decimal"
                  bind:value={item.quantity}
                />
              </label>
              <label>
                <span class={i > 0 ? 'field-label sm:sr-only' : 'field-label'}>Unit price</span>
                <input
                  class="input text-right"
                  type="number"
                  min="0"
                  step="0.01"
                  inputmode="decimal"
                  bind:value={item.unitPrice}
                />
              </label>
              <p class="col-span-2 flex min-h-11 items-center text-sm text-gray-700 sm:col-span-1 sm:justify-end">
                <span class="mr-auto text-gray-500 sm:hidden">Amount</span>
                {formatMoney(lineTotal(item))}
              </p>
              <button
                type="button"
                class="col-span-2 min-h-11 rounded-lg text-sm text-gray-500 hover:text-red-600 disabled:opacity-40 sm:col-span-1 sm:px-2"
                onclick={() => removeItem(i)}
                disabled={quote.items.length === 1}
                aria-label="Remove line {i + 1}"
              >
                <span class="sm:hidden">Remove line</span>
                <span class="hidden sm:inline" aria-hidden="true">✕</span>
              </button>
            </li>
          {/each}
        </ul>

        <button type="button" class="btn-secondary mt-4 w-full sm:w-auto" onclick={addItem}>
          + Add line
        </button>
      </fieldset>

      <fieldset class="rounded-xl border border-gray-200 p-4 sm:p-6">
        <legend class="px-1 font-serif text-lg text-gray-900">Terms</legend>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="flex min-h-11 items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              class="h-5 w-5 rounded border-gray-300 text-brand-dark focus:ring-brand-dark"
              bind:checked={quote.includeGst}
            />
            <span class="text-sm text-gray-700">Add GST ({GST_RATE * 100}%)</span>
          </label>
          {#if quote.includeGst}
            <label>
              <span class="field-label">GST number</span>
              <input class="input" type="text" bind:value={quote.gstNumber} />
            </label>
          {/if}
          <label class="sm:col-span-2">
            <span class="field-label">Notes</span>
            <textarea class="input" rows="4" bind:value={quote.notes}></textarea>
          </label>
        </div>
      </fieldset>
    </div>

    <aside class="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6 lg:sticky lg:top-28">
      <h2 class="text-lg">Summary</h2>
      <dl class="mt-4 space-y-2 text-sm">
        <div class="flex justify-between">
          <dt class="text-gray-500">Subtotal</dt>
          <dd>{formatMoney(totals.subtotal)}</dd>
        </div>
        {#if quote.includeGst}
          <div class="flex justify-between">
            <dt class="text-gray-500">GST</dt>
            <dd>{formatMoney(totals.gst)}</dd>
          </div>
        {/if}
        <div class="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd class="text-brand-dark">{formatMoney(totals.total)}</dd>
        </div>
      </dl>
      <button type="submit" class="btn-primary mt-6 w-full" disabled={generating}>
        {generating ? 'Generating…' : 'Download PDF'}
      </button>
      {#if error}
        <p class="mt-3 text-sm text-red-600" role="alert">{error}</p>
      {/if}
    </aside>
  </form>
</main>
