import type { ContactContainerRect } from '../types/portfolio'

const CONTACT_CONTAINER_VIEWPORT_PADDING = 16
export const PROJECT_ROUTE_PREFIX = '/projects'

interface RouteProjectCard {
  routeAliases?: string[]
  slug: string
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function normalizePathname(pathnameValue: string | null | undefined) {
  const pathname = String(pathnameValue ?? '').trim()

  if (!pathname || pathname === '/') {
    return '/'
  }

  return `/${pathname.replace(/^\/+|\/+$/g, '')}`
}

export function getLocationRouteMode(protocolValue: string) {
  return protocolValue === 'file:' ? 'hash' : 'path'
}

export function parseHashRoute(
  hashValue: string | null | undefined,
  projectCount: number,
  sectionCount: number
) {
  const normalizedHash = String(hashValue ?? '').replace('#', '').trim()
  const projectMatch = normalizedHash.match(/^project-(\d+)$/)
  const sectionMatch = normalizedHash.match(/^section-(\d+)$/)

  if (projectMatch) {
    const projectNumber = Number.parseInt(projectMatch[1], 10) - 1
    if (Number.isInteger(projectNumber) && projectNumber >= 0 && projectNumber < projectCount) {
      return {
        openProjectIndex: projectNumber,
        sectionIndex: Math.max(0, Math.min(sectionCount - 1, projectNumber + 1)),
      }
    }
  }

  if (sectionMatch) {
    const sectionNumber = Number.parseInt(sectionMatch[1], 10)
    if (Number.isInteger(sectionNumber)) {
      return {
        openProjectIndex: null,
        sectionIndex: Math.max(0, Math.min(sectionCount - 1, sectionNumber)),
      }
    }
  }

  return null
}

export function parsePathRoute(
  pathnameValue: string | null | undefined,
  projectCards: RouteProjectCard[],
  sectionCount: number
) {
  const normalizedPathname = normalizePathname(pathnameValue)
  const slugMatch = normalizedPathname.match(/^\/projects\/([^/]+)$/)

  if (!slugMatch) {
    return null
  }

  const slug = decodeURIComponent(slugMatch[1])
  const projectIndex = projectCards.findIndex((card) => {
    const supportedSlugs = [card.slug, ...(card.routeAliases ?? [])]
    return supportedSlugs.includes(slug)
  })

  if (projectIndex === -1) {
    return null
  }

  return {
    openProjectIndex: projectIndex,
    sectionIndex: Math.max(0, Math.min(sectionCount - 1, projectIndex + 1)),
  }
}

export function parseLocationRoute(
  pathnameValue: string | null | undefined,
  hashValue: string | null | undefined,
  protocolValue: string,
  projectCards: RouteProjectCard[],
  sectionCount: number
) {
  if (getLocationRouteMode(protocolValue) === 'hash') {
    return parseHashRoute(hashValue, projectCards.length, sectionCount)
  }

  return (
    parsePathRoute(pathnameValue, projectCards, sectionCount) ??
    parseHashRoute(hashValue, projectCards.length, sectionCount)
  )
}

export function buildLocationUrl(
  openProjectIndex: number | null,
  sectionIndex: number,
  protocolValue: string,
  projectCards: RouteProjectCard[],
  sectionCount: number
) {
  if (getLocationRouteMode(protocolValue) === 'hash') {
    return openProjectIndex !== null ? `#project-${openProjectIndex + 1}` : `#section-${sectionIndex}`
  }

  if (openProjectIndex !== null) {
    const projectSlug = projectCards[openProjectIndex]?.slug
    if (projectSlug) {
      return `${PROJECT_ROUTE_PREFIX}/${projectSlug}`
    }
  }

  const clampedSectionIndex = Math.max(0, Math.min(sectionCount - 1, sectionIndex))
  return clampedSectionIndex > 0 ? `/#section-${clampedSectionIndex}` : '/'
}

export function getContactContainerRect(node: Element | null) {
  if (!node || typeof window === 'undefined') {
    return null
  }

  const rect = node.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const maxWidth = viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING * 2
  const maxHeight = viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING * 2

  if (rect.width <= 0 || rect.height <= 0 || maxWidth <= 0 || maxHeight <= 0) {
    return null
  }

  const isOffscreenHorizontally =
    rect.right <= CONTACT_CONTAINER_VIEWPORT_PADDING ||
    rect.left >= viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING
  const isOffscreenVertically =
    rect.bottom <= CONTACT_CONTAINER_VIEWPORT_PADDING ||
    rect.top >= viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING

  if (isOffscreenHorizontally || isOffscreenVertically) {
    return null
  }

  const width = Math.min(rect.width, maxWidth)
  const height = Math.min(rect.height, maxHeight)

  const contactRect: ContactContainerRect = {
    top: clamp(
      rect.top,
      CONTACT_CONTAINER_VIEWPORT_PADDING,
      viewportHeight - CONTACT_CONTAINER_VIEWPORT_PADDING - height
    ),
    left: clamp(
      rect.left,
      CONTACT_CONTAINER_VIEWPORT_PADDING,
      viewportWidth - CONTACT_CONTAINER_VIEWPORT_PADDING - width
    ),
    width,
    height,
  }

  return contactRect
}
