import type { ProjectSlug } from '../../types/projectCard'
import AisledexProjectDetails from './AisledexProjectDetails'
import GroupCollectionsProjectDetails from './GroupCollectionsProjectDetails'
import MergeProjectDetails from './MergeProjectDetails'

interface ProjectDetailsProps {
  onOpenSystemScopeZoom: () => void
  slug: ProjectSlug
}

function ProjectDetails({ onOpenSystemScopeZoom, slug }: ProjectDetailsProps) {
  switch (slug) {
    case 'aisldex':
      return <AisledexProjectDetails />
    case 'group-collection':
      return <GroupCollectionsProjectDetails onOpenSystemScopeZoom={onOpenSystemScopeZoom} />
    case 'merge':
      return <MergeProjectDetails />
    default:
      return null
  }
}

export default ProjectDetails
