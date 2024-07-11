'use client'

import CollectionsRecordImage from '@/components/collections-record-image'
import { Flex, Card, Box, Text, Inset } from '@radix-ui/themes'

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

const CollectionsRecord = ({
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
}: RecordProps) => (
  <Box maxWidth="500" height="auto" key={id}>
    <Card maxWidth="500" size="3" variant="surface">
      <Inset clip="padding-box" side="top" pb="current">
        <CollectionsRecordImage
          src={`${coverImage || '/placeholder.svg'}`}
          alt={artist.name}
          width={640}
          height={640}
          className="object-contain rounded-sm"
        />
      </Inset>
      <Flex gap="3" direction="column" align="stretch">
        <Text as="p" size="4">
          {title}
        </Text>
        <Text as="p" size="2">
          {artist.name}
        </Text>
        <Text as="p" size="2">
          {year}
        </Text>
        <Text as="p" size="2">
          {formats}
        </Text>
        <Text as="p" size="2">
          {labels}
        </Text>
        <Text as="p" size="2">
          {stringToPill(styles)}
        </Text>
        <Text as="p" size="2">
          {stringToPill(genres)}
        </Text>
      </Flex>
    </Card>
  </Box>
)

const stringToPill = (str: string) => {
  return str.split(',').map((item) => (
    <span
      key={item}
      className="inline-block bg-gray-700 rounded-full px-3 py-2 text-sm text-gray-100 mr-2 mb-2"
    >
      {item}
    </span>
  ))
}

export default CollectionsRecord

{
  /* <div
    key={id}
    className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
  >
    <div className="flex flex-col">
      <div className="relative">
        <CollectionsRecordImage
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
