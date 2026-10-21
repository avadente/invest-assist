import { rankAccounts, type AccountKey, type Experience, type Goal, type Nudge } from '../content'
import { projectGrowth } from './growth'

export type { Experience, Goal, Nudge }

export const experiences: Experience[] = ['new', 'some', 'experienced']
export const goalList: Goal[] = ['safety', 'shortTerm', 'retirement', 'grow', 'learn']
export const budgetPicks = [10, 25, 50, 100]

/** Used for previews when someone picks "not sure yet". */
export const DEFAULT_BUDGET = 25
export const PREVIEW_YEARS = 30
export const PREVIEW_RATE = 6

export interface Profile {
  experience: Experience
  goals: Goal[]
  /** What they could invest each month. null = "not sure yet". */
  monthlyBudget: number | null
  /** Option indexes into content.quiz, in order: horizon, emergency fund, job, risk comfort. */
  horizon: number
  emergency: number
  job: number
  risk: number
}

export interface Plan {
  account: AccountKey
  alsoConsider: AccountKey
  nudges: Nudge[]
  budget: number
  /** What the budget could grow to over PREVIEW_YEARS at PREVIEW_RATE. */
  preview: number
  /** Beginners and cautious people see diversified funds before single stocks. */
  fundsFirst: boolean
}

export function buildPlan(p: Profile): Plan {
  const [account, alsoConsider] = rankAccounts([p.horizon, p.emergency, p.job, p.risk])

  const nudges: Nudge[] = []
  if (p.emergency === 0) nudges.push('safetyFirst')
  if (p.horizon === 0 || (p.goals.includes('shortTerm') && !p.goals.includes('retirement'))) nudges.push('shortTerm')
  if (p.risk === 0) nudges.push('calm')

  const budget = p.monthlyBudget && p.monthlyBudget > 0 ? p.monthlyBudget : DEFAULT_BUDGET
  const pts = projectGrowth({ start: 0, monthly: budget, ratePct: PREVIEW_RATE, years: PREVIEW_YEARS })

  return {
    account,
    alsoConsider,
    nudges,
    budget,
    preview: pts[pts.length - 1].balance,
    fundsFirst: p.experience === 'new' || p.risk === 0,
  }
}

/** Accepts only well-formed saved profiles, so a corrupted save can't crash the app. */
export function isProfile(v: unknown): v is Profile {
  if (!v || typeof v !== 'object') return false
  const p = v as Record<string, unknown>
  const idx = (n: unknown) => Number.isInteger(n) && (n as number) >= 0 && (n as number) <= 2
  return (
    experiences.includes(p.experience as Experience) &&
    Array.isArray(p.goals) && p.goals.every((g) => goalList.includes(g as Goal)) &&
    (p.monthlyBudget === null || (typeof p.monthlyBudget === 'number' && p.monthlyBudget >= 0)) &&
    idx(p.horizon) && idx(p.emergency) && idx(p.job) && idx(p.risk)
  )
}
