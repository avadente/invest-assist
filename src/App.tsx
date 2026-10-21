import { useEffect, useState } from 'react'
import { Search } from './Search'
import type { Lang, TabId } from './content'
import { Home } from './Home'
import { useLang } from './i18n'
import { isProfile, type Profile } from './lib/profile'
import { useStored } from './lib/useStored'
import { Onboarding } from './Onboarding'
import { Calculator, Learn, Ready, Scams } from './sections'

const tabs: { id: TabId; icon: string }[] = [
  { id: 'home', icon: '🏠' },
  { id: 'learn', icon: '📘' },
  { id: 'ready', icon: '✅' },
  { id: 'grow', icon: '📈' },
  { id: 'scams', icon: '🚩' },
]

type Route = TabId | 'glossary' | 'myths'

/** Old links from before the redesign keep working. */
const legacy: Record<string, Route> = { start: 'learn', jargon: 'glossary', account: 'home' }

const fromHash = (): Route => {
  const h = window.location.hash.slice(1).split('/')[0]
  if (h === 'glossary' || h === 'myths' || tabs.some((t) => t.id === h)) return h as Route
  return legacy[h] ?? 'home'
}

/** "#learn/safety" opens the "safety" lesson. */
const lessonFromHash = () => window.location.hash.split('/')[1]

const langs: { id: Lang; label: string; name: string }[] = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'es', label: 'ES', name: 'Español' },
]

export default function App() {
  const { lang, setLang, c } = useLang()
  const ui = c.ui
  const [route, setRoute] = useState<Route>(fromHash)
  const [lesson, setLesson] = useState(lessonFromHash)
  const [saved, setSaved] = useStored<Profile | null>('ia.profile', null)
  const [skipped, setSkipped] = useStored('ia.onboardingSkipped', false)
  const [editing, setEditing] = useState(false)
  const profile = isProfile(saved) ? saved : null

  useEffect(() => {
    const onHash = () => {
      setRoute(fromHash())
      setLesson(lessonFromHash())
      setEditing(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const showOnboarding = editing || (!profile && !skipped)
  const tab: TabId = route === 'glossary' || route === 'myths' ? 'learn' : route

  const done = (p: Profile) => {
    setSaved(p)
    setEditing(false)
    window.location.hash = 'home'
    window.scrollTo(0, 0)
  }

  const skip = () => {
    setSkipped(true)
    setEditing(false)
  }

  let page
  if (showOnboarding) page = <Onboarding initial={profile} skipIntro={editing} onDone={done} onSkip={skip} />
  else if (route === 'home')
    page = <Home profile={profile} onEdit={() => setEditing(true)} onStartOwn={() => { setSaved(null); setSkipped(false) }} />
  else if (route === 'learn' || route === 'glossary' || route === 'myths')
    page = <Learn view={route === 'learn' ? 'lessons' : route} lesson={lesson} key={lesson} />
  else if (route === 'ready') page = <Ready />
  else if (route === 'grow') page = <Calculator profile={profile} />
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
        <Search />
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
        <nav className="foot-nav" aria-label={ui.footerNav}>
          {tabs.map((t) => <a key={t.id} href={`#${t.id}`}>{ui.tabs[t.id]}</a>)}
          <a href="#glossary">{ui.glossaryTab}</a>
          <a href="#myths">{ui.mythsTab}</a>
        </nav>
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
