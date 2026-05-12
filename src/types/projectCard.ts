export type ProjectSlug = 'group-collection' | 'merge' | 'aisledex'

export interface MetaDetail {
  label: string
  support?: string
  value: string
}

export interface ProjectCard {
  headline: string
  heroVideoUrl?: string | null
  id: string
  metaDescription?: string
  descriptionLines: string[]
  mediaPosterUrl: string | null
  mediaVideoUrl: string | null
  metaDetails: MetaDetail[] | null
  metaVideoUrl: string | null
  previewArrowUrl: string
  previewVideoUrl: string
  routeAliases?: string[]
  slug: ProjectSlug
  title: string
}
