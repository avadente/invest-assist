import { describe, expect, it } from 'vitest'
import { formatMoney, projectGrowth } from './growth'

describe('projectGrowth', () => {
  it('with 0% return, balance equals what you put in', () => {
    const pts = projectGrowth({ start: 100, monthly: 50, ratePct: 0, years: 2 })
    expect(pts).toHaveLength(3)
    expect(pts[2]).toEqual({ year: 2, contributed: 1300, balance: 1300 })
  })

  it('matches the future-value-of-annuity formula', () => {
    const pts = projectGrowth({ start: 0, monthly: 100, ratePct: 6, years: 10 })
    const r = 0.06 / 12
    const expected = 100 * ((Math.pow(1 + r, 120) - 1) / r)
    expect(pts[10].balance).toBeCloseTo(expected, 6)
    expect(pts[10].contributed).toBe(12000)
  })

  it('grows a lump sum by monthly compounding', () => {
    const pts = projectGrowth({ start: 1000, monthly: 0, ratePct: 12, years: 1 })
    expect(pts[1].balance).toBeCloseTo(1000 * Math.pow(1.01, 12), 6)
  })

  it('treats bad input safely', () => {
    const pts = projectGrowth({ start: -5, monthly: NaN, ratePct: 7, years: -3 })
    expect(pts).toEqual([{ year: 0, contributed: 0, balance: 0 }])
  })
})

describe('formatMoney', () => {
  it('rounds to whole dollars', () => {
    expect(formatMoney(1234.56)).toBe('$1,235')
  })
})
