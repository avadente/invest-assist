import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { content, type Content, type Lang } from './content'
import { useStored } from './lib/useStored'

interface LangState {
  lang: Lang
  setLang: (l: Lang) => void
  c: Content
}

const LangContext = createContext<LangState | null>(null)

/** First visit: use Spanish if the browser prefers it, otherwise English. */
function browserLang(): Lang {
  try {
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [stored, setLang] = useStored<Lang>('ia.lang', browserLang())
  const lang: Lang = stored === 'es' ? 'es' : 'en'

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'es' ? 'Invest-Assist · Aprende a invertir' : 'Invest-Assist'
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, c: content[lang] }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
