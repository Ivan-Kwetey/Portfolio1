import type { ProjectSlug } from '../../types/projectCard'
import AisledexProjectDetails from './AisledexProjectDetails'
import GroupCollectionsProjectDetails from './GroupCollectionsProjectDetails'
import MergeProjectDetails from './MergeProjectDetails'

interface ProjectDetailsProps {
  onOpenNextCase: () => void
  onOpenSystemScopeZoom: () => void
  slug: ProjectSlug
}

function ProjectDetails({ onOpenNextCase, onOpenSystemScopeZoom, slug }: ProjectDetailsProps) {
  switch (slug) {
    case 'aisldex':
      return <AisledexProjectDetails onOpenNextCase={onOpenNextCase} />
    case 'group-collection':
      return (
        <GroupCollectionsProjectDetails
          onOpenNextCase={onOpenNextCase}
          onOpenSystemScopeZoom={onOpenSystemScopeZoom}
        />
      )
    case 'merge':
      return <MergeProjectDetails onOpenNextCase={onOpenNextCase} />
    default:
      return null
  }
}

export default ProjectDetails
