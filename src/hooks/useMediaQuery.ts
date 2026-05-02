import { useSyncExternalStore } from 'react'

function getMatch(query: string) {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false
}

export function useMediaQuery(query: string, defaultValue = false) {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => undefined
      }

      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener('change', callback)

      return () => {
        mediaQueryList.removeEventListener('change', callback)
      }
    },
    () => getMatch(query),
    () => defaultValue
  )
}
