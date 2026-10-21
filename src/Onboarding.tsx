import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLang } from './i18n'
import { formatMoney } from './lib/growth'
import { budgetPicks, experiences, goalList, type Experience, type Goal, type Profile } from './lib/profile'

type Budget = number | 'unsure' | undefined

interface Draft {
  experience?: Experience
  goals: Goal[]
  budget: Budget
  /** horizon, emergency fund, job, risk comfort: indexes into content.quiz */
  quiz: (number | undefined)[]
}

const fromProfile = (p?: Profile | null): Draft =>
  p
    ? {
        experience: p.experience,
        goals: p.goals,
        budget: p.monthlyBudget ?? 'unsure',
        quiz: [p.horizon, p.emergency, p.job, p.risk],
      }
    : { goals: [], budget: undefined, quiz: [undefined, undefined, undefined, undefined] }

/** A realistic student for live demos: new to investing, part-time job, no emergency fund yet. */
export const SAMPLE: Profile = {
  experience: 'new', goals: ['safety', 'retirement', 'learn'], monthlyBudget: 25,
  horizon: 2, emergency: 0, job: 1, risk: 0,
}

export function Onboarding(props: {
  initial?: Profile | null; skipIntro?: boolean; onDone: (p: Profile) => void; onSkip: () => void
}) {
  const { c: { profile: t, quiz } } = useLang()
  const [intro, setIntro] = useState(!props.initial && !props.skipIntro)
  const [step, setStep] = useState(0)
  const [d, setD] = useState<Draft>(() => fromProfile(props.initial))
  const [other, setOther] = useState(() =>
    typeof d.budget === 'number' && !budgetPicks.includes(d.budget) ? String(d.budget) : '',
  )
  const heading = useRef<HTMLHeadingElement>(null)

  const total = 3 + quiz.length
  useEffect(() => heading.current?.focus(), [step, intro])

  const answered = [
    d.experience !== undefined,
    true, // goals are optional
    d.budget !== undefined && (d.budget === 'unsure' || d.budget >= 0),
    ...d.quiz.map((a) => a !== undefined),
  ][step]

  const finish = () => {
    const [horizon, emergency, job, risk] = d.quiz as number[]
    props.onDone({
      experience: d.experience!,
      goals: d.goals,
      monthlyBudget: d.budget === 'unsure' || d.budget === undefined ? null : d.budget,
      horizon, emergency, job, risk,
    })
  }

  if (intro) {
    return (
      <section className="onboard card">
        <h2 ref={heading} tabIndex={-1}>{t.introTitle}</h2>
        <p className="lead">{t.introLead}</p>
        <p className="muted small">🔒 {t.privacyNote}</p>
        <div className="onboard-nav">
          <button className="btn ghost" onClick={props.onSkip}>{t.skip}</button>
          <button className="btn" onClick={() => setIntro(false)}>{t.begin}</button>
        </div>
        <button className="btn ghost demo" onClick={() => props.onDone(SAMPLE)}>✨ {t.tryDemo}</button>
      </section>
    )
  }

  let title: string
  let hint: string | undefined
  let body: ReactNode

  if (step === 0) {
    title = t.experienceQ
    body = experiences.map((e) => (
      <Choice key={e} type="radio" name="experience" checked={d.experience === e}
        onChange={() => setD({ ...d, experience: e })} onClear={() => setD({ ...d, experience: undefined })}
        label={t.experience[e].label} hint={t.experience[e].hint} />
    ))
  } else if (step === 1) {
    title = t.goalsQ
    hint = t.goalsHint
    body = goalList.map((g) => (
      <Choice key={g} type="checkbox" name="goals" checked={d.goals.includes(g)} label={t.goals[g]}
        onChange={() => setD({ ...d, goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g] })} />
    ))
  } else if (step === 2) {
    title = t.budgetQ
    hint = t.budgetHint
    const isOther = typeof d.budget === 'number' && !budgetPicks.includes(d.budget)
    body = (
      <>
        <div className="chips">
          {budgetPicks.map((b) => (
            <button key={b} type="button" aria-pressed={d.budget === b} className={`chip ${d.budget === b ? 'sel' : ''}`}
              onClick={() => { setD({ ...d, budget: d.budget === b ? undefined : b }); setOther('') }}>
              {formatMoney(b)}{t.perMonth}
            </button>
          ))}
          <button type="button" aria-pressed={d.budget === 'unsure'} className={`chip ${d.budget === 'unsure' ? 'sel' : ''}`}
            onClick={() => { setD({ ...d, budget: d.budget === 'unsure' ? undefined : 'unsure' }); setOther('') }}>
            {t.notSure}
          </button>
        </div>
        <label className={`field other ${isOther ? 'sel' : ''}`}>
          <span>{t.budgetOther}</span>
          <span className="with-prefix">
            <span className="prefix">$</span>
            <input type="number" inputMode="decimal" min={0} max={100000} value={other}
              onChange={(e) => {
                setOther(e.target.value)
                const n = Number(e.target.value)
                setD({ ...d, budget: e.target.value !== '' && Number.isFinite(n) ? Math.min(100000, Math.max(0, n)) : undefined })
              }} />
          </span>
        </label>
      </>
    )
  } else {
    const qi = step - 3
    title = quiz[qi].q
    body = quiz[qi].options.map((o, oi) => (
      <Choice key={oi} type="radio" name={`q${qi}`} checked={d.quiz[qi] === oi} label={o}
        onChange={() => setD({ ...d, quiz: d.quiz.map((v, i) => (i === qi ? oi : v)) })}
        onClear={() => setD({ ...d, quiz: d.quiz.map((v, i) => (i === qi ? undefined : v)) })} />
    ))
  }

  const last = step === total - 1

  return (
    <section className="onboard card">
      <div className="progress">
        <div className="bar"><div style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
        <span className="muted small">{t.stepOf(step + 1, total)}</span>
      </div>
      <fieldset className="onboard-q" aria-labelledby="onboard-q-title">
        <h2 ref={heading} tabIndex={-1} id="onboard-q-title">{title}</h2>
        {hint && <p className="muted">{hint}</p>}
        {body}
        {step !== 1 && <p className="muted small clear-hint">{t.clearHint}</p>}
      </fieldset>
      <div className="onboard-nav">
        {step > 0
          ? <button className="btn ghost" onClick={() => setStep(step - 1)}>{t.back}</button>
          : <button className="btn ghost" onClick={props.onSkip}>{t.skip}</button>}
        <button className="btn" disabled={!answered} onClick={() => (last ? finish() : setStep(step + 1))}>
          {last ? t.finish : t.next}
        </button>
      </div>
    </section>
  )
}

function Choice(props: {
  type: 'radio' | 'checkbox'; name: string; checked: boolean; onChange: () => void; onClear?: () => void
  label: string; hint?: string
}) {
  return (
    <label className={`opt big-opt ${props.checked ? 'sel' : ''}`}>
      <input type={props.type} name={props.name} checked={props.checked} onChange={props.onChange}
        // A selected radio button can't normally be unselected; clicking it again clears the answer.
        onClick={() => { if (props.type === 'radio' && props.checked) props.onClear?.() }} />
      <span>
        <span className="step-label">{props.label}</span>
        {props.hint && <span className="muted small block">{props.hint}</span>}
      </span>
    </label>
  )
}
