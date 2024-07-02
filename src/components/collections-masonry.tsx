'use client'

import React, { useState, useEffect } from 'react'

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

const CollectionsMasonary: React.FC<DiscogResponse> = ({
  pagination,
  releases,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const currentPage = pagination.page || 1

  const productsWithIndex = products.map((product, index) => ({
    ...product,
    index: index, // Adding an index property
  }))

  useEffect(() => {
    // Convert releases to the desired format for products
    const newProducts: Product[] = releases.map(
      ({ basic_information }: DiscogRecord) => ({
        coverImage: basic_information.cover_image,
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

    setProducts(newProducts) // Update the state with the new products
  }, [currentPage, releases]) // Depend on currentPage and releases to trigger the effect

  return (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {productsWithIndex.map((product) => (
        <div className="rounded-lg p-1 pb-6 break-inside">
          <CollectionsRecordMasonry
            key={`${product.id}-${product.index}`}
            {...product}
          />
        </div>
      ))}
    </div>
  )
}

export default CollectionsMasonary
