import { useEffect, useState } from 'react'
import type { Lang, TabId } from './content'
import { Home } from './Home'
import { useLang } from './i18n'
import { isProfile, type Profile } from './lib/profile'
import { useStored, writeStored } from './lib/useStored'
import { Onboarding } from './Onboarding'
import { Calculator, Learn, Ready, Scams } from './sections'

const tabs: { id: TabId; icon: string }[] = [
  { id: 'home', icon: '🏠' },
  { id: 'learn', icon: '📘' },
  { id: 'ready', icon: '✅' },
  { id: 'grow', icon: '📈' },
  { id: 'scams', icon: '🚩' },
]

type Route = TabId | 'glossary'

/** Old links from before the redesign keep working. */
const legacy: Record<string, Route> = { start: 'learn', jargon: 'glossary', account: 'home' }

const fromHash = (): Route => {
  const h = window.location.hash.slice(1)
  if (h === 'glossary' || tabs.some((t) => t.id === h)) return h as Route
  return legacy[h] ?? 'home'
}

const langs: { id: Lang; label: string; name: string }[] = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'es', label: 'ES', name: 'Español' },
]

export default function App() {
  const { lang, setLang, c } = useLang()
  const ui = c.ui
  const [route, setRoute] = useState<Route>(fromHash)
  const [saved, setSaved] = useStored<Profile | null>('ia.profile', null)
  const [skipped, setSkipped] = useStored('ia.onboardingSkipped', false)
  const [editing, setEditing] = useState(false)
  const profile = isProfile(saved) ? saved : null

  useEffect(() => {
    const onHash = () => {
      setRoute(fromHash())
      setEditing(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const showOnboarding = editing || (!profile && !skipped)
  const tab: TabId = route === 'glossary' ? 'learn' : route

  const done = (p: Profile) => {
    setSaved(p)
    setEditing(false)
    if (p.monthlyBudget) writeStored('ia.calc.monthly', p.monthlyBudget)
    window.location.hash = 'home'
    window.scrollTo(0, 0)
  }

  const skip = () => {
    setSkipped(true)
    setEditing(false)
  }

  let page
  if (showOnboarding) page = <Onboarding initial={profile} skipIntro={editing} onDone={done} onSkip={skip} />
  else if (route === 'home') page = <Home profile={profile} onEdit={() => setEditing(true)} />
  else if (route === 'learn' || route === 'glossary') page = <Learn view={route === 'learn' ? 'lessons' : 'glossary'} />
  else if (route === 'ready') page = <Ready />
  else if (route === 'grow') page = <Calculator />
  else page = <Scams />

  return (
    <div className="shell">
      <header className="top">
        <a href="#home" className="brand">
          <span className="logo" aria-hidden>🌱</span>
          <span>
            <strong>Invest-Assist</strong>
            <span className="muted small block">{ui.tagline}</span>
          </span>
        </a>
        <div className="lang" role="group" aria-label={ui.langLabel}>
          {langs.map((l) => (
            <button key={l.id} lang={l.id} aria-pressed={lang === l.id} title={l.name}
              className={lang === l.id ? 'active' : ''} onClick={() => setLang(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {!showOnboarding && (
        <nav className="tabs" aria-label="Sections">
          {tabs.map((t) => (
            <a key={t.id} href={`#${t.id}`} className={t.id === tab ? 'active' : ''}
              aria-current={t.id === tab ? 'page' : undefined}>
              <span aria-hidden>{t.icon}</span> {ui.tabs[t.id]}
            </a>
          ))}
        </nav>
      )}

      <main>{page}</main>

      <footer className="foot muted small">
        <p>
          <strong>{ui.disclaimerStrong}</strong> {ui.disclaimer}
        </p>
        <p>
          {ui.resourcesLabel}{' '}
          {ui.resources.map((r, i) => (
            <span key={r.href}>
              {i > 0 && ' · '}
              <a href={r.href} target="_blank" rel="noreferrer">{r.label}</a>
            </span>
          ))}
        </p>
      </footer>
    </div>
  )
}
