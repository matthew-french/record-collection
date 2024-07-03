import React from 'react'

import CollectionsRecordMasonry from '@/components/collections-record-masonry'

import DiscogResponse from '@/types/DiscogResponse'
import { DiscogRecord } from '@/types/DiscogRecord'

interface Artist {
  name: string
  id: string
  resourceUrl: string
}

interface Product {
  coverImage: string
  imageSizeClass: string
  id: number
  thumb: string
  year: number
  title: string
  genres: string
  artist: Artist
  styles: string
  masterUrl: string
  resourceUrl: string
  formats: string
}

const CollectionsMasonary: React.FC<DiscogResponse> = ({ releases }) => {
  const imageSizeClasses = [
    'w-400 h-400',
    'w-200 h-200',
    'w-100 h-100',
    'w-50 h-50',
  ]

  const randomImageSizeClasses = () => {
    const res =
      imageSizeClasses[Math.floor(Math.random() * imageSizeClasses.length)]
    return res
  }
  // Convert releases to the desired format for products
  const products: Product[] = releases.map(
    ({ basic_information }: DiscogRecord) => ({
      coverImage: basic_information.cover_image,
      imageSizeClass: randomImageSizeClasses(),
      id: basic_information.id,
      thumb: basic_information.thumb,
      year: basic_information.year,
      title: basic_information.title,
      genres: basic_information.genres.join(', '),
      artist: {
        name: basic_information.artists[0].name,
        id: basic_information.artists[0].id,
        resourceUrl: basic_information.artists[0].resource_url,
      },
      styles: basic_information.styles.join(', '),
      masterUrl: basic_information.master_url,
      resourceUrl: basic_information.resource_url,
      formats: basic_information.formats
        .map((format) => format.name)
        .join(', '),
    })
  )

  return (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {products.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="rounded-lg p-1 pb-6 break-inside"
        >
          <CollectionsRecordMasonry {...product} />
        </div>
      ))}
    </div>
  )
}

export default CollectionsMasonary
