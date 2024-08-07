'use client'

import { useMemo } from 'react'
import CollectionRecordImage from '@/components/collection-record-image'
import { Strong, Card, Box, Text, Inset, Badge, Flex } from '@radix-ui/themes'

interface Artist {
  name: string
  id: string
  resourceUrl: string
}

interface RecordProps {
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
  labels: string
}

const colors = [
  'text-blue-300',
  'text-blue-600',
  'text-green-300',
  'text-green-600',
  'text-red-500',
  'text-red-700',
  'text-yellow-300',
  'text-yellow-600',
  'text-purple-100',
  'text-purple-300',
  'text-indigo-400',
  'text-indigo-100',
  'text-pink-300',
  'text-pink-600',
  'text-white',
]

const stringToColorIndex = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash) % colors.length // Ensure index is within colors array bounds
}

const CollectionRecord = ({
  id,
  coverImage,
  artist,
  title,
  year,
  styles,
  masterUrl,
  resourceUrl,
  genres,
  formats,
  labels,
}: RecordProps) => {
  const stringToBadge = (str: string) => {
    return str.split(',').map((item, index) => (
      <Badge
        className="outline-blue-700"
        key={index}
        size="2"
        variant="outline"
        radius="large"
      >
        {item}
      </Badge>
    ))
  }

  const randomColor = useMemo(() => {
    // Use the artist's name to get a consistent color index
    return colors[stringToColorIndex(artist.name)]
  }, [artist.name])

  return (
    <Box height="auto" key={id}>
      <Card size="3" variant="surface" className="p-1 md:p-2 lg:p-4">
        <Inset clip="padding-box" side="top" pb="current">
          <CollectionRecordImage
            src={`${coverImage || '/static/images/record.webp'}`}
            alt={artist.name}
            width={640}
            height={640}
            className="object-contain rounded-sm"
          />
        </Inset>
        <Flex gap="2" justify="center" direction="column">
          <Text as="p" size="4" className={randomColor}>
            <Strong>{artist.name}</Strong>
          </Text>
          <Text as="p" size="3">
            <Strong>{title}</Strong>
          </Text>
          <Text as="p" size="3">
            {year}
          </Text>
          <Text as="p" size="3">
            {formats}
          </Text>
          <Text as="p" size="3">
            {labels}
          </Text>
        </Flex>
        <Flex pt="3" gap="3" direction="row" wrap="wrap">
          {styles && stringToBadge(styles)}
          {genres && stringToBadge(genres)}
        </Flex>
      </Card>
    </Box>
  )
}

export default CollectionRecord

{
  /* <div
    key={id}
    className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
  >
    <div className="flex flex-col">
      <div className="relative">
        <CollectionRecordImage
          src={`${coverImage || '/placeholder.svg'}`}
          alt={artist.name}
          width={640}
          height={640}
          className="object-contain rounded-sm"
        />
      </div>
      <div className="p-3 pb-1">
        <h3 className="font-semibold mt-1 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{artist.name}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{year}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{formats}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{labels}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {stringToPill(styles)}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {stringToPill(genres)}
        </p>
      </div>
    </div>
  </div> */
}
