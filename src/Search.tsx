import { useEffect, useState } from 'react'
import { useLang } from './i18n'

/** Site-wide search over pages, lessons, dictionary terms and myths. */
export function Search() {
  const { c } = useLang()
  const [q, setQ] = useState('')

  useEffect(() => {
    const clear = () => setQ('')
    window.addEventListener('hashchange', clear)
    return () => window.removeEventListener('hashchange', clear)
  }, [])

  const items = [
    ...Object.entries(c.ui.tabs).map(([id, label]) => ({ label, text: label, href: `#${id}` })),
    ...c.lessons.map((l) => ({ label: `📘 ${l.title}`, text: l.title + ' ' + l.body.join(' '), href: `#learn/${l.id}` })),
    ...c.glossary.map((t) => ({ label: `💬 ${t.term}`, text: t.term + ' ' + t.plain, href: '#glossary' })),
    ...c.myths.map((m) => ({ label: `🏡 ${m.myth}`, text: m.myth + ' ' + m.fact, href: '#myths' })),
  ]
  const term = q.trim().toLowerCase()
  const hits = term.length < 2 ? [] : items.filter((i) => i.text.toLowerCase().includes(term)).slice(0, 8)

  return (
    <div className="site-search" role="search">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={c.ui.searchHint}
        aria-label={c.ui.searchSite} onKeyDown={(e) => e.key === 'Escape' && setQ('')} />
      {term.length >= 2 && (
        <ul className="search-results card">
          {hits.map((h) => <li key={h.href + h.label}><a href={h.href}>{h.label}</a></li>)}
          {hits.length === 0 && <li className="muted">{c.ui.searchNone}</li>}
        </ul>
      )}
    </div>
  )
}
