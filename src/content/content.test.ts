import { describe, expect, it } from 'vitest'
import { content, quizScores, rankAccounts } from '.'

const { en, es } = content

describe('English and Spanish stay in sync', () => {
  it('have the same lessons and checklist steps, in the same order', () => {
    expect(es.lessons.map((l) => l.id)).toEqual(en.lessons.map((l) => l.id))
    expect(es.readySteps.map((s) => s.id)).toEqual(en.readySteps.map((s) => s.id))
  })

  it('have the same UI keys', () => {
    expect(Object.keys(es.ui).sort()).toEqual(Object.keys(en.ui).sort())
    expect(Object.keys(es.ui.tabs).sort()).toEqual(Object.keys(en.ui.tabs).sort())
  })

  it('have the same number of red flags, glossary entries and account cards', () => {
    expect(es.redFlags).toHaveLength(en.redFlags.length)
    expect(es.glossary).toHaveLength(en.glossary.length)
    expect(Object.keys(es.accountInfo).sort()).toEqual(Object.keys(en.accountInfo).sort())
  })

  it('quiz options line up with the shared scores in both languages', () => {
    for (const c of [en, es]) {
      expect(c.quiz).toHaveLength(quizScores.length)
      c.quiz.forEach((q, i) => expect(q.options).toHaveLength(quizScores[i].length))
    }
  })

  it('has no empty strings anywhere', () => {
    const walk = (v: unknown): void => {
      if (typeof v === 'string') expect(v.trim()).not.toBe('')
      else if (v && typeof v === 'object') Object.values(v).forEach(walk)
    }
    walk(en)
    walk(es)
  })
})

describe('rankAccounts', () => {
  it('sends someone with no emergency fund to a savings account first', () => {
    expect(rankAccounts([0, 0, 2, 0])[0]).toBe('hysa')
  })

  it('points a long-term saver with a job match to the 401(k)', () => {
    expect(rankAccounts([2, 2, 0, 2])[0]).toBe('k401')
  })
})
