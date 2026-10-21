import { useEffect, useState } from 'react'

/** useState that remembers its value on this device. Falls back to memory if storage is blocked. */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Private mode or storage disabled: keep working in memory only.
    }
  }, [key, value])

  return [value, setValue] as const
}
