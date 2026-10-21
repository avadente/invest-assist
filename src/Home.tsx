import { useLang } from './i18n'
import { formatMoney } from './lib/growth'
import { buildPlan, PREVIEW_RATE, PREVIEW_YEARS, type Profile } from './lib/profile'
import { useStored } from './lib/useStored'

export function Home(props: { profile: Profile | null; onEdit: () => void }) {
  const { c } = useLang()
  const t = c.profile
  const [readyDone] = useStored<string[]>('ia.ready', [])
  const [lessonsDone] = useStored<string[]>('ia.lessons', [])

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
  const acct = c.accountInfo[plan.account]
  const nextStep = c.readySteps.find((s) => !readyDone.includes(s.id))
  const nextLesson = c.lessons.find((l) => !lessonsDone.includes(l.id))

  return (
    <section>
      <h2>{t.homeTitle}</h2>
      <p className="lead">{t.greeting[p.experience]}</p>

      {plan.nudges.map((n) => (
        <div key={n} className="card callout nudge"><span aria-hidden>💡 </span>{t.nudges[n]}</div>
      ))}

      <div className="home-grid">
        <div className="card">
          <div className="muted small">{t.accountCard}</div>
          <h3>{acct.name}</h3>
          <p>{acct.summary}</p>
          <p><strong>{c.ui.quizNext}</strong> {acct.next}</p>
          <p className="muted small">{c.ui.quizAlso} {c.accountInfo[plan.alsoConsider].name}.</p>
        </div>

        <div className="card">
          <div className="muted small">{t.nextStepCard}</div>
          {nextStep ? (
            <>
              <h3>{nextStep.label}</h3>
              <p className="muted">{nextStep.why}</p>
            </>
          ) : (
            <h3>{c.ui.allDone}</h3>
          )}
          <a href="#ready">{t.seeChecklist} →</a>
        </div>

        <div className="card">
          <div className="muted small">{t.growthCard}</div>
          <div className="big">{formatMoney(plan.preview)}</div>
          <p>{t.growthLine(formatMoney(plan.budget), PREVIEW_YEARS, formatMoney(plan.preview))}</p>
          <p className="muted small">{t.growthNote(PREVIEW_RATE)}</p>
          <a href="#grow">{t.tryCalc} →</a>
        </div>

        <div className="card">
          <div className="muted small">{t.lessonCard}</div>
          {nextLesson ? (
            <>
              <h3>{nextLesson.title}</h3>
              {p.experience === 'experienced' && <p className="muted small">{t.experiencedLessons}</p>}
              <a href="#learn">{t.lessonCta} →</a>
            </>
          ) : (
            <h3>{t.lessonsAllDone}</h3>
          )}
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
