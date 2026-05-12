import type { ReactElement } from 'react'

import type { ProjectSlug } from '../../types/projectCard'
import AisledexProjectDetails from './AisledexProjectDetails'
import GroupCollectionsProjectDetails from './GroupCollectionsProjectDetails'
import MergeProjectDetails from './MergeProjectDetails'

interface ProjectDetailsProps {
  onOpenNextCase: () => void
  onOpenSystemScopeZoom: () => void
  slug: ProjectSlug
}

const PROJECT_DETAIL_RENDERERS: Record<ProjectSlug, (props: ProjectDetailsProps) => ReactElement> = {
  'aisledex': ({ onOpenNextCase }) => <AisledexProjectDetails onOpenNextCase={onOpenNextCase} />,
  'group-collection': ({ onOpenNextCase, onOpenSystemScopeZoom }) => (
    <GroupCollectionsProjectDetails
      onOpenNextCase={onOpenNextCase}
      onOpenSystemScopeZoom={onOpenSystemScopeZoom}
    />
  ),
  merge: ({ onOpenNextCase }) => <MergeProjectDetails onOpenNextCase={onOpenNextCase} />,
}

function ProjectDetails({ onOpenNextCase, onOpenSystemScopeZoom, slug }: ProjectDetailsProps) {
  return PROJECT_DETAIL_RENDERERS[slug]({
    onOpenNextCase,
    onOpenSystemScopeZoom,
    slug,
  })
}

export default ProjectDetails
