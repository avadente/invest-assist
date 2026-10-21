import type { StepNote } from '../content'
import type { Profile } from './profile'

export type StepStatus = 'done' | 'next' | 'later'

export interface ActionStep {
  /** Same ids as content.readySteps, so checking a step here also checks it in "Am I ready?". */
  id: string
  status: StepStatus
  /** Lesson that explains this step. */
  lesson: string
  note?: StepNote
}

const order = ['budget', 'starter', 'highdebt', 'match', 'full', 'roth', 'fund', 'auto']

const lessonFor: Record<string, string> = {
  budget: 'what',
  starter: 'safety',
  highdebt: 'safety',
  match: 'accounts',
  full: 'safety',
  roth: 'accounts',
  fund: 'funds',
  auto: 'compound',
}

const INVEST_STEPS = new Set(['roth', 'fund', 'auto'])

/** The readiness checklist, tailored to someone's answers. Quiz option indexes match content.quiz. */
export function buildActionPlan(p: Profile, done: string[]): ActionStep[] {
  const steps: ActionStep[] = []
  for (const id of order) {
    // Only people whose job offers a match need the match step.
    if (id === 'match' && p.job !== 0) continue

    let note: StepNote | undefined
    if (id === 'roth' && p.job === 2) note = 'needsIncome'
    else if (INVEST_STEPS.has(id) && p.horizon === 0) note = 'longTermOnly'
    else if (id === 'starter' && p.emergency === 0) note = 'startHere'

    steps.push({ id, status: done.includes(id) ? 'done' : 'later', lesson: lessonFor[id], note })
  }
  const next = steps.find((s) => s.status !== 'done')
  if (next) next.status = 'next'
  return steps
}
