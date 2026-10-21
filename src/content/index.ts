import { en } from './en'
import { es } from './es'
import type { Content, Lang } from './types'

export const content: Record<Lang, Content> = { en, es }

export * from './types'
export { quizScores, rankAccounts } from './quizScores'
