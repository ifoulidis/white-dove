export const GST_RATE = 0.15

export const business = {
  name: 'White Dove Professional Painting',
  location: 'Matamata',
  phone: '027 606 1821',
}

export interface QuoteItem {
  description: string
  quantity: number
  unitPrice: number
}

export interface Quote {
  number: string
  date: string
  validUntil: string
  client: {
    name: string
    address: string
    email: string
    phone: string
  }
  jobSite: string
  items: QuoteItem[]
  // Unit prices are entered excluding GST
  includeGst: boolean
  gstNumber: string
  notes: string
}

const toInputDate = (date: Date) => date.toISOString().slice(0, 10)

export function newQuote(today = new Date()): Quote {
  const validUntil = new Date(today)
  validUntil.setDate(validUntil.getDate() + 30)

  return {
    number: `Q-${toInputDate(today).replaceAll('-', '')}-01`,
    date: toInputDate(today),
    validUntil: toInputDate(validUntil),
    client: { name: '', address: '', email: '', phone: '' },
    jobSite: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    includeGst: true,
    gstNumber: '',
    notes:
      'Price includes all materials and labour. Any additional work outside this scope will be discussed and agreed before it begins.',
  }
}

const roundCents = (value: number) => Math.round(value * 100) / 100

export const lineTotal = (item: QuoteItem) =>
  roundCents((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0))

export function quoteTotals(quote: Quote) {
  const subtotal = roundCents(quote.items.reduce((sum, item) => sum + lineTotal(item), 0))
  const gst = quote.includeGst ? roundCents(subtotal * GST_RATE) : 0
  return { subtotal, gst, total: roundCents(subtotal + gst) }
}

const currency = new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' })
export const formatMoney = (value: number) => currency.format(value)

export const formatDate = (isoDate: string) =>
  isoDate
    ? new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-NZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''
