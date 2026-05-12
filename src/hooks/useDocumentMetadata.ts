import { useEffect } from 'react'

interface DocumentMetadata {
  description: string
  title: string
}

const META_DESCRIPTION_SELECTOR = 'meta[name="description"]'

export function useDocumentMetadata({ description, title }: DocumentMetadata) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.title = title

    let descriptionNode = document.querySelector<HTMLMetaElement>(META_DESCRIPTION_SELECTOR)
    if (!descriptionNode) {
      descriptionNode = document.createElement('meta')
      descriptionNode.name = 'description'
      document.head.appendChild(descriptionNode)
    }

    descriptionNode.content = description
  }, [description, title])
}
