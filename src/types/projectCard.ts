import type { ReactNode } from 'react'

export type ProjectSlug = 'group-collection' | 'merge' | 'aisldex'

export interface MetaDetail {
  label: string
  support?: ReactNode
  value: ReactNode
}

export interface ProjectCard {
  description: ReactNode
  headline: string
  id: string
  mediaPosterUrl: string | null
  mediaVideoUrl: string | null
  metaDetails: MetaDetail[] | null
  metaVideoUrl: string | null
  previewArrowUrl: string
  previewVideoUrl: string
  slug: ProjectSlug
}
