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

/** Rounded to the nearest $100, for projections that are estimates anyway. */
export const formatAbout = (n: number) => formatMoney(Math.round(n / 100) * 100)

export function formatMoney(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

const finalBalance = (input: GrowthInput) => {
  const pts = projectGrowth(input)
  return pts[pts.length - 1].balance
}

/** How long a "wait and see" delay is worth comparing for a given plan length. */
export function waitYears(years: number): number {
  return years >= 15 ? 10 : Math.max(1, Math.floor(years / 3))
}

/** What waiting `wait` years to start costs, compared with starting today. */
export function costOfWaiting(input: GrowthInput, wait = waitYears(input.years)) {
  const now = finalBalance(input)
  const later = finalBalance({ ...input, years: Math.max(0, input.years - wait) })
  return { wait, now, later, lost: Math.max(0, now - later) }
}

/** First year growth has added more than you put in yourself, or null if it never does. */
export function crossoverYear(points: YearPoint[]): number | null {
  const hit = points.find((p) => p.year > 0 && p.balance - p.contributed > p.contributed)
  return hit ? hit.year : null
}

/** The same plan in cash (0%), a savings account, and invested. */
export function compareOptions(input: GrowthInput, savingsRatePct = 1) {
  return {
    cash: finalBalance({ ...input, ratePct: 0 }),
    savings: finalBalance({ ...input, ratePct: savingsRatePct }),
    invested: finalBalance(input),
  }
}

export const perDay = (monthly: number) => (Math.max(0, monthly || 0) * 12) / 365
