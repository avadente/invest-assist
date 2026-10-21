import { describe, expect, it } from 'vitest'
import { content } from '../content'
import { buildActionPlan } from './actionPlan'
import type { Profile } from './profile'

const p: Profile = {
  experience: 'new', goals: ['retirement'], monthlyBudget: 50,
  horizon: 2, emergency: 1, job: 1, risk: 1,
}

describe('buildActionPlan', () => {
  it('uses only real checklist steps, each with a real lesson', () => {
    const readyIds = content.en.readySteps.map((s) => s.id)
    const lessonIds = content.en.lessons.map((l) => l.id)
    for (const s of buildActionPlan({ ...p, job: 0 }, [])) {
      expect(readyIds).toContain(s.id)
      expect(lessonIds).toContain(s.lesson)
    }
  })

  it('skips the 401(k) match step when the job has no match', () => {
    expect(buildActionPlan(p, []).map((s) => s.id)).not.toContain('match')
    expect(buildActionPlan({ ...p, job: 0 }, []).map((s) => s.id)).toContain('match')
  })

  it('marks done steps and points to exactly one next step', () => {
    const plan = buildActionPlan(p, ['budget', 'starter'])
    expect(plan.filter((s) => s.status === 'done').map((s) => s.id)).toEqual(['budget', 'starter'])
    expect(plan.filter((s) => s.status === 'next').map((s) => s.id)).toEqual(['highdebt'])
  })

  it('has no next step once everything is done', () => {
    const all = buildActionPlan(p, []).map((s) => s.id)
    expect(buildActionPlan(p, all).some((s) => s.status === 'next')).toBe(false)
  })

  it('explains the Roth IRA needs job income', () => {
    expect(buildActionPlan({ ...p, job: 2 }, []).find((s) => s.id === 'roth')?.note).toBe('needsIncome')
  })

  it('warns that investing steps are for long-term money when it is needed soon', () => {
    const plan = buildActionPlan({ ...p, horizon: 0 }, [])
    expect(plan.find((s) => s.id === 'fund')?.note).toBe('longTermOnly')
  })

  it('flags the emergency fund as the place to start when there is none', () => {
    expect(buildActionPlan({ ...p, emergency: 0 }, []).find((s) => s.id === 'starter')?.note).toBe('startHere')
  })
})
