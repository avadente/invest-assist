export interface GrowthInput {
  /** Money you start with today. */
  start: number
  /** Money you add every month. */
  monthly: number
  /** Average yearly return, as a percent (7 means 7%). */
  ratePct: number
  years: number
}

export interface YearPoint {
  year: number
  /** Everything you personally put in so far. */
  contributed: number
  /** What the account is worth at the end of that year. */
  balance: number
}

/**
 * Projects growth with monthly compounding and deposits made at the end of
 * each month. Returns one point per year, starting with year 0.
 */
export function projectGrowth({ start, monthly, ratePct, years }: GrowthInput): YearPoint[] {
  const s = Math.max(0, start || 0)
  const m = Math.max(0, monthly || 0)
  const y = Math.max(0, Math.min(60, Math.floor(years || 0)))
  const r = (ratePct || 0) / 100 / 12

  const points: YearPoint[] = [{ year: 0, contributed: s, balance: s }]
  let balance = s
  let contributed = s
  for (let month = 1; month <= y * 12; month++) {
    balance = balance * (1 + r) + m
    contributed += m
    if (month % 12 === 0) {
      points.push({ year: month / 12, contributed, balance })
    }
  }
  return points
}

export function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
