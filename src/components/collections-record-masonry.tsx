'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CollectionsRecordImage from '@/components/collections-record-image'

interface Artist {
  name: string
  id: string
  resourceUrl: string
}

interface RecordProps {
  coverImage: string
  imageSizeClass: String
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

const CollectionsRecordMasonry: React.FC<RecordProps> = ({
  id,
  coverImage,
  imageSizeClass,
  artist,
  title,
  year,
  styles,
  masterUrl,
  resourceUrl,
  genres,
  formats,
}) => {
  return (
    <div key={id} className="">
      <Link href="#">
        <CollectionsRecordImage
          src={`${coverImage || '/placeholder.svg'}`}
          alt={artist.name}
          width={640}
          height={640}
          className={`object-contain rounded-sm ${imageSizeClass}`}
        />
      </Link>
    </div>
  )
}

export default CollectionsRecordMasonry
