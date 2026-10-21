import { describe, expect, it } from 'vitest'
import { buildPlan, DEFAULT_BUDGET, isProfile, type Profile } from './profile'

const base: Profile = {
  experience: 'some',
  goals: ['retirement'],
  monthlyBudget: 50,
  horizon: 2,
  emergency: 2,
  job: 1,
  risk: 1,
}

describe('buildPlan', () => {
  it('suggests a Roth IRA for a long-term saver with a job but no match', () => {
    expect(buildPlan(base).account).toBe('roth')
    expect(buildPlan(base).nudges).toEqual([])
  })

  it('nudges toward a safety net when there is no emergency fund', () => {
    const plan = buildPlan({ ...base, emergency: 0 })
    expect(plan.nudges).toContain('safetyFirst')
  })

  it('flags short-term money and cautious feelings', () => {
    const plan = buildPlan({ ...base, horizon: 0, risk: 0 })
    expect(plan.nudges).toEqual(['shortTerm', 'calm'])
    expect(plan.fundsFirst).toBe(true)
  })

  it('shows funds first for beginners', () => {
    expect(buildPlan({ ...base, experience: 'new' }).fundsFirst).toBe(true)
    expect(buildPlan({ ...base, experience: 'experienced' }).fundsFirst).toBe(false)
  })

  it('uses a default budget when the user is not sure yet', () => {
    const plan = buildPlan({ ...base, monthlyBudget: null })
    expect(plan.budget).toBe(DEFAULT_BUDGET)
    expect(plan.preview).toBeGreaterThan(DEFAULT_BUDGET * 12 * 30)
  })
})

describe('isProfile', () => {
  it('accepts a valid profile', () => {
    expect(isProfile(base)).toBe(true)
  })

  it('rejects broken or tampered saves', () => {
    expect(isProfile(null)).toBe(false)
    expect(isProfile({ ...base, experience: 'guru' })).toBe(false)
    expect(isProfile({ ...base, risk: 7 })).toBe(false)
    expect(isProfile({ ...base, goals: ['getRichQuick'] })).toBe(false)
    expect(isProfile({ ...base, monthlyBudget: -10 })).toBe(false)
  })
})
