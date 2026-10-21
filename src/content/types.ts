export type Lang = 'en' | 'es'

export type AccountKey = 'hysa' | 'k401' | 'roth' | 'brokerage'

export type TabId = 'start' | 'ready' | 'grow' | 'account' | 'jargon' | 'scams'

export interface Lesson {
  id: string
  title: string
  minutes: number
  body: string[]
  takeaway: string
}

export interface Term {
  term: string
  plain: string
  example?: string
}

export interface ReadyStep {
  id: string
  label: string
  why: string
}

export interface QuizQuestion {
  q: string
  /** Same order as the matching row in quizScores. */
  options: string[]
}

export interface Link {
  label: string
  href: string
}

export interface Ui {
  tagline: string
  langLabel: string
  tabs: Record<TabId, string>
  disclaimerStrong: string
  disclaimer: string
  resourcesLabel: string
  resources: Link[]
  progress: (done: number, total: number, what: string) => string

  startTitle: string
  startLead: string
  lessonsDone: string
  min: string
  takeaway: string
  markDone: string
  markNotDone: string

  readyTitle: string
  readyLead: string
  stepsDone: string
  nextStep: string
  allDone: string

  calcTitle: string
  calcLead: string
  startAmount: string
  monthlyAmount: string
  yearsInvested: string
  yearsSuffix: string
  yearlyReturn: string
  calcNote: string
  afterYears: (years: number) => string
  youPutIn: string
  growthAdded: string
  legendIn: string
  legendGrowth: string
  chartLabel: (balance: string) => string

  quizTitle: string
  quizLead: string
  quizBest: string
  quizNext: string
  quizAlso: string
  startOver: string

  jargonTitle: string
  jargonLead: string
  searchPlaceholder: string
  searchLabel: string
  example: string
  noMatches: string

  scamTitle: string
  scamLead: string
  scamNone: string
  scamHits: (n: number) => string
  scamAdvice: string
  brokerCheck: Link
  reportFraud: Link
}

export interface Content {
  ui: Ui
  lessons: Lesson[]
  glossary: Term[]
  readySteps: ReadyStep[]
  redFlags: string[]
  quiz: QuizQuestion[]
  accountInfo: Record<AccountKey, { name: string; summary: string; next: string }>
}
