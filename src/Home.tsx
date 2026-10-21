import { useState } from 'react'
import { useLang } from './i18n'
import { SAMPLE } from './Onboarding'
import { buildActionPlan } from './lib/actionPlan'
import { costOfWaiting, formatAbout, formatMoney } from './lib/growth'
import { buildPlan, type Profile } from './lib/profile'
import { cardBlob, shareText, type ShareCard } from './lib/shareCard'
import { useStored } from './lib/useStored'

export function Home(props: { profile: Profile | null; onEdit: () => void; onStartOwn: () => void }) {
  const { c } = useLang()
  const t = c.profile
  const [readyDone, setReadyDone] = useStored<string[]>('ia.ready', [])
  const [lastSteps, setLastSteps] = useState<string[] | null>(null)

  if (!props.profile) {
    return (
      <section>
        <h2>{t.homeTitle}</h2>
        <div className="card callout">
          <h3>{t.getPlanTitle}</h3>
          <p>{t.getPlanLead}</p>
          <button className="btn" onClick={props.onEdit}>{t.getPlanCta}</button>
        </div>
      </section>
    )
  }

  const p = props.profile
  const plan = buildPlan(p)
  const steps = buildActionPlan(p, readyDone)
  const stepText = (id: string) => c.readySteps.find((s) => s.id === id)!
  const next = steps.find((s) => s.status === 'next')
  const doneCount = steps.filter((s) => s.status === 'done').length
  const acct = c.accountInfo[plan.account]
  const wait = costOfWaiting({ start: 0, monthly: plan.budget, ratePct: plan.rate, years: plan.years })

  const toggle = (id: string) =>
    setReadyDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  const card: ShareCard = {
    title: t.shareHeading,
    rows: [
      { label: t.shareCanInvest, value: p.monthlyBudget === null ? t.notSure : `${formatMoney(p.monthlyBudget)}${t.perMonth}` },
      { label: t.answersGoals, value: p.goals.length ? p.goals.map((g) => t.goals[g]).join(' · ') : t.noGoals },
      { label: t.accountCard, value: acct.name },
      { label: t.nextStepCard, value: next ? stepText(next.id).action : c.ui.allDone },
    ],
    highlight: {
      value: formatAbout(plan.preview),
      caption: t.growthLine(formatMoney(plan.budget), plan.years, formatAbout(plan.preview)),
    },
    progress: t.shareProgress(doneCount, steps.length),
    cta: t.shareCta,
    url: window.location.origin,
    disclaimer: c.ui.disclaimerStrong,
  }

  return (
    <section>
      {JSON.stringify(p) === JSON.stringify(SAMPLE) && (
        <div className="card callout example-banner" role="status">
          <span>{c.ui.exampleBanner}</span>
          <button className="btn" onClick={props.onStartOwn}>{c.ui.startOwn}</button>
        </div>
      )}
      <h2>{t.homeTitle}</h2>
      <p className="lead">{t.greeting[p.experience]}</p>

      {plan.nudges.map((n) => (
        <div key={n} className="card callout nudge"><span aria-hidden>💡 </span>{t.nudges[n]}</div>
      ))}

      <SummaryCard card={card} />

      <div className="card">
        <h3>{t.planTitle}</h3>
        <p className="muted small">{t.planLead}</p>
        <div className="progress">
          <div className="bar"><div style={{ width: `${(doneCount / steps.length) * 100}%` }} /></div>
          <span className="muted small">{t.shareProgress(doneCount, steps.length)}</span>
        </div>
        <ResetBar canReset={readyDone.length > 0} canUndo={!!lastSteps}
          onReset={() => { setLastSteps(readyDone); setReadyDone([]) }}
          onUndo={() => { setReadyDone(lastSteps!); setLastSteps(null) }} />
        <ol className="steps">
          {steps.map((s, i) => {
            const text = stepText(s.id)
            return (
              <li key={s.id} className={`step ${s.status}`}>
                <label>
                  <input type="checkbox" checked={s.status === 'done'} onChange={() => toggle(s.id)} />
                  <span>
                    <span className="step-label">
                      {i + 1}. {text.label}
                      {s.status === 'next' && <span className="tag">{t.stepNext}</span>}
                    </span>
                    <span className="muted small block">{text.why}</span>
                    {s.note && <span className="step-note block small">{t.stepNotes[s.note]}</span>}
                  </span>
                </label>
                <a className="small" href={`#learn/${s.lesson}`}>{t.learnHow} →</a>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="home-grid">
        <div className="card">
          <div className="muted small">{t.accountCard}</div>
          <h3>{acct.name}</h3>
          <p>{acct.summary}</p>
          <p><strong>{c.ui.quizNext}</strong> {acct.next}</p>
          <p className="muted small">{c.ui.quizAlso} {c.accountInfo[plan.alsoConsider].name}.</p>
        </div>

        <div className="card">
          <div className="muted small">{t.growthCard}</div>
          <div className="big">{formatAbout(plan.preview)}</div>
          <p>{t.growthLine(formatMoney(plan.budget), plan.years, formatAbout(plan.preview))}</p>
          {wait.lost > 0 && <p><strong>{t.waitLine(wait.wait, formatAbout(wait.lost))}</strong></p>}
          <p className="muted small">{t.growthNote(plan.rate)}</p>
          <a href="#grow">{t.tryCalc} →</a>
        </div>
      </div>

      <details className="card answers">
        <summary>{t.answersTitle}</summary>
        <dl>
          <div><dt>{t.answersExperience}</dt><dd>{t.experience[p.experience].label}</dd></div>
          <div><dt>{t.answersGoals}</dt><dd>{p.goals.length ? p.goals.map((g) => t.goals[g]).join(' · ') : t.noGoals}</dd></div>
          <div><dt>{t.answersBudget}</dt><dd>{p.monthlyBudget === null ? t.notSure : `${formatMoney(p.monthlyBudget)}${t.perMonth}`}</dd></div>
          {c.quiz.map((q, i) => (
            <div key={i}>
              <dt>{q.q}</dt>
              <dd>{q.options[[p.horizon, p.emergency, p.job, p.risk][i]]}</dd>
            </div>
          ))}
        </dl>
        <button className="btn ghost" onClick={props.onEdit}>{t.editAnswers}</button>
      </details>
    </section>
  )
}

export function ResetBar(props: { canReset: boolean; canUndo: boolean; onReset: () => void; onUndo: () => void }) {
  const { c: { ui } } = useLang()
  if (!props.canReset && !props.canUndo) return null
  return (
    <div className="reset-bar">
      {props.canUndo
        ? <button className="btn ghost" onClick={props.onUndo}>↶ {ui.undo}</button>
        : <button className="btn ghost" onClick={props.onReset}>↺ {ui.reset}</button>}
    </div>
  )
}

function SummaryCard({ card }: { card: ShareCard }) {
  const { c: { profile: t } } = useLang()
  const [status, setStatus] = useState<string>('')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText(card))
      setStatus(t.copied)
    } catch {
      setStatus(t.shareFailed)
    }
  }

  const download = async () => {
    const blob = await cardBlob(card)
    if (!blob) return setStatus(t.shareFailed)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invest-assist-plan.png'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const share = async () => {
    const text = shareText(card)
    try {
      const blob = await cardBlob(card)
      const file = blob && new File([blob], 'invest-assist-plan.png', { type: 'image/png' })
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: card.title, text, files: [file] })
      } else if (navigator.share) {
        await navigator.share({ title: card.title, text })
      } else {
        return copy()
      }
      setStatus('')
    } catch (e) {
      // Closing the share sheet isn't an error worth showing.
      if ((e as Error).name !== 'AbortError') setStatus(t.shareFailed)
    }
  }

  return (
    <div className="card summary">
      <div className="muted small">{t.summaryTitle}</div>
      <div className="share-preview">
        <div className="share-brand">🌱 Invest-Assist</div>
        <h3>{card.title}</h3>
        <dl>
          {card.rows.map((r) => (
            <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>
          ))}
        </dl>
        <div className="share-highlight">
          <div className="big">{card.highlight.value}</div>
          <div className="small">{card.highlight.caption}</div>
        </div>
        <div className="small"><strong>{card.progress}</strong></div>
      </div>
      <p className="muted small">{t.summaryLead}</p>
      <div className="share-actions">
        <button className="btn" onClick={share}>{t.share}</button>
        <button className="btn ghost" onClick={download}>{t.download}</button>
        <button className="btn ghost" onClick={copy}>{t.copy}</button>
      </div>
      <p className="small" role="status" aria-live="polite">{status}</p>
    </div>
  )
}
