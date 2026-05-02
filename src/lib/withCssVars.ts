import type { CSSProperties } from 'react'

export function withCssVars<T extends string>(style: Record<T, string>) {
  return style as CSSProperties
}
