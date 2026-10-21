import { describe, expect, it } from 'vitest'
import { compareOptions, costOfWaiting, crossoverYear, formatMoney, perDay, projectGrowth, waitYears } from './growth'

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

describe('calculator persuasion helpers', () => {
  const input = { start: 0, monthly: 50, ratePct: 6, years: 30 }

  it('waiting 10 years costs real money', () => {
    const r = costOfWaiting(input)
    expect(r.wait).toBe(10)
    expect(r.now).toBeGreaterThan(r.later)
    expect(r.lost).toBeCloseTo(r.now - r.later, 6)
    // Waiting 10 of 30 years loses far more than the 10 years of deposits ($6,000).
    expect(r.lost).toBeGreaterThan(6000 * 2)
  })

  it('scales the wait to short plans', () => {
    expect(waitYears(6)).toBe(2)
    expect(waitYears(1)).toBe(1)
  })

  it('finds the year growth passes what you put in', () => {
    const year = crossoverYear(projectGrowth(input))
    expect(year).not.toBeNull()
    const pts = projectGrowth(input)
    const p = pts[year!]
    expect(p.balance - p.contributed).toBeGreaterThan(p.contributed)
    const before = pts[year! - 1]
    expect(before.balance - before.contributed).toBeLessThanOrEqual(before.contributed)
  })

  it('returns null when growth never catches up', () => {
    expect(crossoverYear(projectGrowth({ ...input, years: 5 }))).toBeNull()
  })

  it('orders cash < savings < invested', () => {
    const c = compareOptions(input)
    expect(c.cash).toBe(50 * 12 * 30)
    expect(c.savings).toBeGreaterThan(c.cash)
    expect(c.invested).toBeGreaterThan(c.savings)
  })

  it('turns a monthly amount into a daily one', () => {
    expect(perDay(50)).toBeCloseTo(1.64, 2)
  })
})
