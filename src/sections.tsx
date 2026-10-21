import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from './i18n'
import { compareOptions, costOfWaiting, crossoverYear, formatMoney, perDay, projectGrowth } from './lib/growth'
import { useStored } from './lib/useStored'

export function StartHere({ lesson }: { lesson?: string }) {
  const { c: { ui, lessons } } = useLang()
  const [done, setDone] = useStored<string[]>('ia.lessons', [])
  const [open, setOpen] = useState<string | null>(() =>
    lessons.some((l) => l.id === lesson) ? lesson! : (lessons.find((l) => !done.includes(l.id)) ?? lessons[0]).id)
  const openRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (lesson) openRef.current?.scrollIntoView?.({ block: 'start' })
  }, [lesson])

  const toggleDone = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  return (
    <section>
      <h2>{ui.startTitle}</h2>
      <p className="lead">{ui.startLead}</p>
      <Progress value={done.length} max={lessons.length} label={ui.lessonsDone} />
      <ol className="lessons">
        {lessons.map((l, i) => {
          const isOpen = open === l.id
          const isDone = done.includes(l.id)
          return (
            <li key={l.id} ref={isOpen ? openRef : undefined} className={`card lesson ${isDone ? 'done' : ''}`}>
              <button
                className="lesson-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : l.id)}
              >
                <span className="num" aria-hidden>{isDone ? '✓' : i + 1}</span>
                <span className="lesson-title">{l.title}</span>
                <span className="muted small">{l.minutes} {ui.min}</span>
              </button>
              {isOpen && (
                <div className="lesson-body">
                  {l.body.map((p, j) => <p key={j}>{p}</p>)}
                  <p className="takeaway"><strong>{ui.takeaway}</strong> {l.takeaway}</p>
                  <button className="btn" onClick={() => toggleDone(l.id)}>
                    {isDone ? ui.markNotDone : ui.markDone}
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function Learn({ view, lesson }: { view: 'lessons' | 'glossary' | 'myths'; lesson?: string }) {
  const { c: { ui } } = useLang()
  return (
    <>
      <nav className="subtabs" aria-label={ui.tabs.learn}>
        <a href="#learn" className={view === 'lessons' ? 'active' : ''} aria-current={view === 'lessons' ? 'page' : undefined}>
          📘 {ui.lessonsTab}
        </a>
        <a href="#glossary" className={view === 'glossary' ? 'active' : ''} aria-current={view === 'glossary' ? 'page' : undefined}>
          💬 {ui.glossaryTab}
        </a>
        <a href="#myths" className={view === 'myths' ? 'active' : ''} aria-current={view === 'myths' ? 'page' : undefined}>
          🏡 {ui.mythsTab}
        </a>
      </nav>
      {view === 'lessons' ? <StartHere lesson={lesson} /> : view === 'glossary' ? <Jargon /> : <Myths />}
    </>
  )
}

export function Ready() {
  const { c: { ui, readySteps } } = useLang()
  const [checked, setChecked] = useStored<string[]>('ia.ready', [])
  const nextStep = readySteps.find((s) => !checked.includes(s.id))

  const toggle = (id: string) =>
    setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  return (
    <section>
      <h2>{ui.readyTitle}</h2>
      <p className="lead">{ui.readyLead}</p>
      <Progress value={checked.length} max={readySteps.length} label={ui.stepsDone} />
      <div className="card callout">
        {nextStep ? (
          <>
            <strong>{ui.nextStep}</strong> {nextStep.action}
            <div className="muted small">{nextStep.why}</div>
          </>
        ) : (
          <strong>{ui.allDone}</strong>
        )}
      </div>
      <ul className="checklist">
        {readySteps.map((s, i) => (
          <li key={s.id} className="card">
            <label>
              <input type="checkbox" checked={checked.includes(s.id)} onChange={() => toggle(s.id)} />
              <span>
                <span className="step-label">{i + 1}. {s.label}</span>
                <span className="muted small block">{s.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Calculator() {
  const { c: { ui } } = useLang()
  const [start, setStart] = useStored('ia.calc.start', 0)
  const [monthly, setMonthly] = useStored('ia.calc.monthly', 50)
  const [years, setYears] = useStored('ia.calc.years', 30)
  const [rate, setRate] = useStored('ia.calc.rate', 6)

  const points = useMemo(
    () => projectGrowth({ start, monthly, years, ratePct: rate }),
    [start, monthly, years, rate],
  )
  const last = points[points.length - 1]
  const growth = last.balance - last.contributed
  const input = { start, monthly, years, ratePct: rate }
  const wait = costOfWaiting(input)
  const options = compareOptions(input)
  const cross = crossoverYear(points)
  const multiplier = last.contributed > 0 ? (last.balance / last.contributed).toFixed(2) : null

  return (
    <section>
      <h2>{ui.calcTitle}</h2>
      <p className="lead">{ui.calcLead}</p>
      <div className="calc">
        <div className="card inputs">
          <NumberField label={ui.startAmount} prefix="$" value={start} onChange={setStart} min={0} max={1_000_000} />
          <NumberField label={ui.monthlyAmount} prefix="$" value={monthly} onChange={setMonthly} min={0} max={100_000} />
          <RangeField label={ui.yearsInvested} value={years} onChange={setYears} min={1} max={50} suffix={ui.yearsSuffix} />
          <RangeField label={ui.yearlyReturn} value={rate} onChange={setRate} min={0} max={10} step={0.5} suffix="%" />
          <p className="muted small">{ui.calcNote}</p>
        </div>
        <div className="card result">
          <div className="big">{formatMoney(last.balance)}</div>
          <p>
            {ui.afterYears(years)} {ui.youPutIn} <strong>{formatMoney(last.contributed)}</strong>, {ui.growthAdded}{' '}
            <strong className="accent">{formatMoney(growth)}</strong>.
          </p>
          <GrowthChart points={points} label={ui.chartLabel(formatMoney(last.balance))} />
          <div className="legend">
            <span><i className="sw sw-in" /> {ui.legendIn}</span>
            <span><i className="sw sw-grow" /> {ui.legendGrowth}</span>
          </div>
        </div>
      </div>

      <div className="card why">
        <h3>{ui.whyTitle}</h3>
        {wait.lost > 0 && (
          <p className="why-big">
            <span className="why-num">−{formatMoney(wait.lost)}</span>
            <span>{ui.waitCost(wait.wait, formatMoney(wait.later), formatMoney(wait.lost))}</span>
          </p>
        )}
        <h4>{ui.compareTitle}</h4>
        <ul className="bars">
          {([
            [ui.cashLabel, options.cash, 'bar-cash'],
            [ui.savingsLabel, options.savings, 'bar-save'],
            [ui.investLabel(rate), options.invested, 'bar-invest'],
          ] as const).map(([label, value, cls]) => (
            <li key={cls}>
              <div className="bar-row"><span>{label}</span><strong>{formatMoney(value)}</strong></div>
              <div className="bar-track" aria-hidden>
                <div className={cls} style={{ width: `${options.invested > 0 ? Math.max(2, (value / Math.max(options.invested, options.cash)) * 100) : 0}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <ul className="why-facts">
          <li>{cross ? ui.crossover(cross) : ui.noCrossover}</li>
          {monthly > 0 && <li>{ui.perDay(formatMoney(monthly), perDay(monthly).toLocaleString('en-US', { style: 'currency', currency: 'USD' }))}</li>}
          {multiplier && rate > 0 && <li>{ui.multiplier(multiplier)}</li>}
        </ul>
        <p className="muted small">{ui.whyNote}</p>
      </div>
    </section>
  )
}

function GrowthChart({ points, label }: { points: { year: number; contributed: number; balance: number }[]; label: string }) {
  const W = 600, H = 240, P = 8
  const max = Math.max(1, ...points.map((p) => p.balance))
  const n = Math.max(1, points.length - 1)
  const x = (i: number) => P + (i / n) * (W - 2 * P)
  const y = (v: number) => H - P - (v / max) * (H - 2 * P)
  const line = (key: 'balance' | 'contributed') =>
    points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ')
  const area = (key: 'balance' | 'contributed') => `${line(key)} L${x(n)},${H - P} L${x(0)},${H - P} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={label}>
      <path d={area('balance')} className="a-grow" />
      <path d={area('contributed')} className="a-in" />
      <path d={line('balance')} className="l-grow" />
    </svg>
  )
}

export function Myths() {
  const { c: { ui, myths } } = useLang()
  return (
    <section>
      <h2>{ui.mythsTitle}</h2>
      <p className="lead">{ui.mythsLead}</p>
      {myths.map((m) => (
        <article key={m.myth} className="card myth">
          <div className="muted small">{ui.mythLabel}</div>
          <h3>{m.myth}</h3>
          <p><strong>{ui.factLabel}:</strong> {m.fact}</p>
          <p className="takeaway"><strong>{ui.familyLabel}:</strong> {m.family}</p>
        </article>
      ))}
    </section>
  )
}

export function Jargon() {
  const { c: { ui, glossary } } = useLang()
  const [q, setQ] = useState('')
  const list = glossary.filter((t) =>
    (t.term + ' ' + t.plain).toLowerCase().includes(q.trim().toLowerCase()),
  )
  return (
    <section>
      <h2>{ui.jargonTitle}</h2>
      <p className="lead">{ui.jargonLead}</p>
      <input className="search" type="search" placeholder={ui.searchPlaceholder}
        value={q} onChange={(e) => setQ(e.target.value)} aria-label={ui.searchLabel} />
      <div className="glossary">
        {list.map((t) => (
          <details key={t.term} className="card term">
            <summary>{t.term}</summary>
            <p>{t.plain}{t.example && <span className="muted small block">{ui.example} {t.example}</span>}</p>
          </details>
        ))}
        {list.length === 0 && <p className="muted">{ui.noMatches}</p>}
      </div>
    </section>
  )
}

export function Scams() {
  const { c: { ui, redFlags } } = useLang()
  const [hits, setHits] = useState<number[]>([])
  const toggle = (i: number) => setHits((h) => (h.includes(i) ? h.filter((x) => x !== i) : [...h, i]))
  return (
    <section>
      <h2>{ui.scamTitle}</h2>
      <p className="lead">{ui.scamLead}</p>
      <ul className="checklist">
        {redFlags.map((f, i) => (
          <li key={i} className="card">
            <label>
              <input type="checkbox" checked={hits.includes(i)} onChange={() => toggle(i)} />
              <span>{f}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className={`card callout ${hits.length ? 'warn' : ''}`} aria-live="polite">
        {hits.length === 0 ? (
          <span>{ui.scamNone}</span>
        ) : (
          <span>
            <strong>{ui.scamHits(hits.length)}</strong> {ui.scamAdvice}{' '}
            <a href={ui.brokerCheck.href} target="_blank" rel="noreferrer">{ui.brokerCheck.label}</a> ·{' '}
            <a href={ui.reportFraud.href} target="_blank" rel="noreferrer">{ui.reportFraud.label}</a>
          </span>
        )}
      </div>
    </section>
  )
}

function Progress({ value, max, label }: { value: number; max: number; label: string }) {
  const { c: { ui } } = useLang()
  return (
    <div className="progress">
      <div className="bar"><div style={{ width: `${(value / max) * 100}%` }} /></div>
      <span className="muted small">{ui.progress(value, max, label)}</span>
    </div>
  )
}

function NumberField(props: {
  label: string; value: number; onChange: (n: number) => void; min: number; max: number; prefix?: string
}) {
  // Keep what the person typed as text, so an empty box stays empty instead of snapping back to "0".
  const [text, setText] = useState(props.value ? String(props.value) : '')
  return (
    <label className="field">
      <span>{props.label}</span>
      <span className="with-prefix">
        {props.prefix && <span className="prefix">{props.prefix}</span>}
        <input type="number" inputMode="decimal" min={props.min} max={props.max} value={text} placeholder="0"
          onChange={(e) => {
            const raw = e.target.value.replace(/^0+(?=\d)/, '')
            const n = Number(raw)
            const clamped = Number.isFinite(n) ? Math.min(props.max, Math.max(props.min, n)) : 0
            setText(raw !== '' && clamped !== n ? String(clamped) : raw)
            props.onChange(raw === '' ? 0 : clamped)
          }} />
      </span>
    </label>
  )
}

function RangeField(props: {
  label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; suffix?: string
}) {
  return (
    <label className="field">
      <span>{props.label}: <strong>{props.value}{props.suffix}</strong></span>
      <input type="range" min={props.min} max={props.max} step={props.step ?? 1} value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))} />
    </label>
  )
}
