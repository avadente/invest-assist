import { describe, expect, it } from 'vitest'
import { shareText, type ShareCard } from './shareCard'

const card: ShareCard = {
  title: 'My Invest-Assist plan',
  rows: [
    { label: 'First account', value: 'Roth IRA' },
    { label: 'Next step', value: 'Build a starter emergency fund' },
  ],
  highlight: { value: '$50,226', caption: '$50 a month for 30 years could grow to about $50,226.' },
  progress: '2 of 7 steps done',
  cta: 'Make your own plan:',
  url: 'https://example.com',
  disclaimer: 'For learning only, not financial advice.',
}

describe('shareText', () => {
  it('includes every row, the highlight, progress, link and disclaimer', () => {
    const t = shareText(card)
    expect(t).toContain('First account: Roth IRA')
    expect(t).toContain('Next step: Build a starter emergency fund')
    expect(t).toContain('could grow to about $50,226')
    expect(t).toContain('2 of 7 steps done')
    expect(t).toContain('Make your own plan: https://example.com')
    expect(t).toContain('not financial advice')
  })
})
