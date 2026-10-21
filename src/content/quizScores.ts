import type { AccountKey } from './types'

type Scores = Partial<Record<AccountKey, number>>

/**
 * How much each quiz answer points toward each account, shared by every language.
 * quizScores[question][option] lines up with quiz[question].options[option].
 */
export const quizScores: Scores[][] = [
  // When might you need this money?
  [{ hysa: 3 }, { hysa: 2, brokerage: 1 }, { roth: 2, k401: 2 }],
  // Do you have an emergency fund yet?
  [{ hysa: 4 }, { hysa: 2, roth: 1 }, { roth: 1, k401: 1, brokerage: 1 }],
  // Do you earn money from a job or side gig?
  [{ k401: 4, roth: 1 }, { roth: 3 }, { hysa: 2, brokerage: 1 }],
  // How would you feel about a 20% drop?
  [{ hysa: 2 }, { roth: 1, k401: 1 }, { roth: 2, k401: 1, brokerage: 1 }],
]

export function rankAccounts(answers: (number | null)[]): AccountKey[] {
  const totals: Record<AccountKey, number> = { hysa: 0, k401: 0, roth: 0, brokerage: 0 }
  answers.forEach((a, qi) => {
    if (a === null) return
    for (const [k, v] of Object.entries(quizScores[qi][a])) totals[k as AccountKey] += v ?? 0
  })
  return (Object.keys(totals) as AccountKey[]).sort((a, b) => totals[b] - totals[a])
}
