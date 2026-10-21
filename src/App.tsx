import { useEffect, useState, type ReactNode } from 'react'
import type { Lang, TabId } from './content'
import { useLang } from './i18n'
import { Calculator, Jargon, Ready, Scams, StartHere, WhichAccount } from './sections'

const tabs: { id: TabId; icon: string; el: ReactNode }[] = [
  { id: 'start', icon: '📘', el: <StartHere /> },
  { id: 'ready', icon: '✅', el: <Ready /> },
  { id: 'grow', icon: '📈', el: <Calculator /> },
  { id: 'account', icon: '🧭', el: <WhichAccount /> },
  { id: 'jargon', icon: '💬', el: <Jargon /> },
  { id: 'scams', icon: '🚩', el: <Scams /> },
]

const fromHash = (): TabId => {
  const h = window.location.hash.slice(1)
  return tabs.find((t) => t.id === h)?.id ?? 'start'
}

const langs: { id: Lang; label: string; name: string }[] = [
  { id: 'en', label: 'EN', name: 'English' },
  { id: 'es', label: 'ES', name: 'Español' },
]

export default function App() {
  const { lang, setLang, c } = useLang()
  const ui = c.ui
  const [tab, setTab] = useState<TabId>(fromHash)

  useEffect(() => {
    const onHash = () => setTab(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const current = tabs.find((t) => t.id === tab)!

  return (
    <div className="shell">
      <header className="top">
        <a href="#start" className="brand">
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

      <nav className="tabs" aria-label="Sections">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className={t.id === tab ? 'active' : ''}
            aria-current={t.id === tab ? 'page' : undefined}>
            <span aria-hidden>{t.icon}</span> {ui.tabs[t.id]}
          </a>
        ))}
      </nav>

      <main key={lang}>{current.el}</main>

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
