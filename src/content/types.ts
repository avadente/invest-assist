export type Lang = 'en' | 'es'

export type AccountKey = 'hysa' | 'k401' | 'roth' | 'brokerage'

export type TabId = 'home' | 'learn' | 'ready' | 'grow' | 'scams'

export type Experience = 'new' | 'some' | 'experienced'
export type Goal = 'safety' | 'shortTerm' | 'retirement' | 'grow' | 'learn'
export type Nudge = 'safetyFirst' | 'shortTerm' | 'calm'

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

  quizBest: string
  quizNext: string
  quizAlso: string
  lessonsTab: string
  glossaryTab: string

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

export interface ProfileText {
  // Onboarding
  introTitle: string
  introLead: string
  privacyNote: string
  begin: string
  skip: string
  back: string
  next: string
  finish: string
  stepOf: (step: number, total: number) => string
  experienceQ: string
  experience: Record<Experience, { label: string; hint: string }>
  goalsQ: string
  goalsHint: string
  goals: Record<Goal, string>
  budgetQ: string
  budgetHint: string
  budgetOther: string
  notSure: string
  perMonth: string

  // Home
  homeTitle: string
  greeting: Record<Experience, string>
  getPlanTitle: string
  getPlanLead: string
  getPlanCta: string
  nudges: Record<Nudge, string>
  accountCard: string
  nextStepCard: string
  seeChecklist: string
  growthCard: string
  growthLine: (budget: string, years: number, total: string) => string
  growthNote: (rate: number) => string
  tryCalc: string
  lessonCard: string
  lessonCta: string
  lessonsAllDone: string
  experiencedLessons: string
  answersTitle: string
  answersExperience: string
  answersGoals: string
  answersBudget: string
  noGoals: string
  editAnswers: string
}

export interface Content {
  ui: Ui
  profile: ProfileText
  lessons: Lesson[]
  glossary: Term[]
  readySteps: ReadyStep[]
  redFlags: string[]
  quiz: QuizQuestion[]
  accountInfo: Record<AccountKey, { name: string; summary: string; next: string }>
}
