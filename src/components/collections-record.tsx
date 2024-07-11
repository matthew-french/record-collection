'use client'

import CollectionsRecordImage from '@/components/collections-record-image'
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
  <Box height="auto" key={id}>
    <Card size="3" variant="surface">
      <Inset clip="padding-box" side="top" pb="current">
        <CollectionsRecordImage
          src={`${coverImage || '/placeholder.svg'}`}
          alt={artist.name}
          width={640}
          height={640}
          className="object-contain rounded-sm"
        />
      </Inset>
      <Flex gap="2" justify="center" direction="column">
        <Text as="p" size="4" color="blue">
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
