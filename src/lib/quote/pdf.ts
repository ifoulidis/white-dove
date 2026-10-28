import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'

import Logo from '$lib/images/logo-wordmark.png'

import {
  GST_RATE,
  type Quote,
  business,
  formatDate,
  formatMoney,
  lineTotal,
  quoteTotals,
} from './quote'

const BRAND = '#0a7ea4'
const MUTED = '#6b7280'
const RULE = '#e5e7eb'

async function toDataUrl(url: string) {
  const blob = await (await fetch(url)).blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

const label = (text: string): Content => ({ text: text.toUpperCase(), style: 'label' })

const lines = (...values: string[]) => values.filter(value => value.trim()).join('\n')

export function buildDefinition(quote: Quote, logo: string): TDocumentDefinitions {
  const { subtotal, gst, total } = quoteTotals(quote)
  const items = quote.items.filter(item => item.description.trim() || lineTotal(item))

  const totalsRows = [
    ['Subtotal', formatMoney(subtotal)],
    ...(quote.includeGst ? [[`GST (${GST_RATE * 100}%)`, formatMoney(gst)]] : []),
  ]

  return {
    pageSize: 'A4',
    pageMargins: [48, 48, 48, 64],
    info: { title: `Quote ${quote.number}`, author: business.name },
    defaultStyle: { fontSize: 10, color: '#1f2937', lineHeight: 1.25 },
    styles: {
      label: { fontSize: 8, bold: true, color: BRAND, characterSpacing: 1, margin: [0, 0, 0, 4] },
      title: { fontSize: 26, bold: true, color: '#111827' },
      tableHeader: { fontSize: 8, bold: true, color: MUTED, characterSpacing: 0.5 },
    },
    footer: (currentPage, pageCount) => ({
      margin: [48, 24, 48, 0],
      columns: [
        {
          text: `${business.name} · ${business.location} · ${business.phone}`,
          color: MUTED,
          fontSize: 8,
        },
        {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'right',
          color: MUTED,
          fontSize: 8,
        },
      ],
    }),
    content: [
      {
        columns: [
          { image: logo, width: 170 },
          {
            stack: [
              { text: 'Quote', style: 'title', alignment: 'right' },
              {
                margin: [0, 8, 0, 0],
                alignment: 'right',
                color: MUTED,
                text: lines(
                  `No. ${quote.number}`,
                  `Issued ${formatDate(quote.date)}`,
                  quote.validUntil ? `Valid until ${formatDate(quote.validUntil)}` : '',
                  quote.gstNumber ? `GST No. ${quote.gstNumber}` : '',
                ),
              },
            ],
          },
        ],
      },
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 499, y2: 0, lineWidth: 1, lineColor: RULE }],
        margin: [0, 20, 0, 20],
      },
      {
        columns: [
          {
            stack: [
              label('Prepared for'),
              { text: quote.client.name || '—', bold: true },
              {
                text: lines(quote.client.address, quote.client.email, quote.client.phone),
                color: MUTED,
              },
            ],
          },
          {
            stack: [
              label('Job site'),
              { text: quote.jobSite.trim() || quote.client.address || '—', color: MUTED },
            ],
          },
        ],
        columnGap: 24,
        margin: [0, 0, 0, 28],
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 40, 80, 80],
          body: [
            [
              { text: 'DESCRIPTION', style: 'tableHeader' },
              { text: 'QTY', style: 'tableHeader', alignment: 'right' },
              { text: 'UNIT PRICE', style: 'tableHeader', alignment: 'right' },
              { text: 'AMOUNT', style: 'tableHeader', alignment: 'right' },
            ],
            ...items.map(item => [
              { text: item.description },
              { text: String(item.quantity), alignment: 'right' as const },
              { text: formatMoney(Number(item.unitPrice) || 0), alignment: 'right' as const },
              { text: formatMoney(lineTotal(item)), alignment: 'right' as const },
            ]),
          ],
        },
        layout: {
          hLineWidth: i => (i === 0 ? 0 : 1),
          vLineWidth: () => 0,
          hLineColor: () => RULE,
          paddingTop: () => 8,
          paddingBottom: () => 8,
          paddingLeft: i => (i === 0 ? 0 : 8),
          paddingRight: (i, node) => (i === (node.table.widths?.length ?? 1) - 1 ? 0 : 8),
        },
      },
      {
        margin: [0, 12, 0, 0],
        columns: [
          { text: '', width: '*' },
          {
            width: 220,
            table: {
              widths: ['*', 'auto'],
              body: [
                ...totalsRows.map(([name, value]) => [
                  { text: name, color: MUTED },
                  { text: value, alignment: 'right' as const },
                ]),
                [
                  { text: quote.includeGst ? 'Total (incl. GST)' : 'Total', bold: true },
                  {
                    text: formatMoney(total),
                    bold: true,
                    fontSize: 13,
                    color: BRAND,
                    alignment: 'right' as const,
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: (i, node) => (i === node.table.body.length - 1 ? 1 : 0),
              vLineWidth: () => 0,
              hLineColor: () => RULE,
              paddingLeft: () => 0,
              paddingRight: () => 0,
              paddingTop: () => 4,
              paddingBottom: () => 4,
            },
          },
        ],
      },
      ...(quote.notes.trim()
        ? [
            {
              margin: [0, 32, 0, 0] as [number, number, number, number],
              stack: [label('Notes'), { text: quote.notes, color: MUTED }],
            },
          ]
        : []),
      {
        margin: [0, 48, 0, 0],
        unbreakable: true,
        stack: [
          label('Acceptance'),
          {
            text: 'To accept this quote, sign below or reply to confirm and we will arrange a start date.',
            color: MUTED,
            margin: [0, 0, 0, 36],
          },
          {
            columns: [
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 220,
                        y2: 0,
                        lineWidth: 1,
                        lineColor: '#9ca3af',
                      },
                    ],
                  },
                  { text: 'Signature', color: MUTED, fontSize: 8, margin: [0, 4, 0, 0] },
                ],
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 140,
                        y2: 0,
                        lineWidth: 1,
                        lineColor: '#9ca3af',
                      },
                    ],
                  },
                  { text: 'Date', color: MUTED, fontSize: 8, margin: [0, 4, 0, 0] },
                ],
              },
            ],
            columnGap: 40,
          },
        ],
      },
    ],
  }
}

export async function downloadQuotePdf(quote: Quote) {
  // Loaded on demand so pdfmake (~1MB with fonts) never ships on public pages
  const [pdfMakeModule, fontsModule, logo] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
    toDataUrl(Logo),
  ])
  // Both are CommonJS bundles; Vite exposes them only as default exports
  type PdfMake = typeof pdfMakeModule
  type Vfs = typeof fontsModule
  const pdfMake = (pdfMakeModule as unknown as { default: PdfMake }).default
  const fonts = (fontsModule as unknown as { default: Vfs }).default
  pdfMake.addVirtualFileSystem(fonts)

  const fileName = `${quote.number || 'quote'}${quote.client.name ? ` - ${quote.client.name}` : ''}.pdf`
  await pdfMake.createPdf(buildDefinition(quote, logo)).download(fileName)
}
