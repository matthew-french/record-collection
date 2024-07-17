import { Grid, Box } from '@radix-ui/themes'
import CollectionRecord from './collection-record'

import { DiscogRecord } from '@/types/DiscogRecord'
interface Artist {
  name: string
  id: string
  resourceUrl: string
}
interface Record {
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

const Collection = ({ releases }: { releases: DiscogRecord[] }) => {
  const records: Record[] = releases.map(
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
      labels: Array.from(new Set(basic_information.labels))
        .map((label) => label.name)
        .join(', '),
    })
  )

  return (
    <Box p='4'>
      <Grid
        columns={{ initial: '2', sm: '3', md: '4', lg: '5' }}
        gap='4'
        width='auto'
        align='start'
        justify={{ initial: 'center' }}
      >
        {records.map((product, index) => (
          <CollectionRecord key={`${product.id}-${index}`} {...product} />
        ))}
      </Grid>
    </Box>
  )
}

export default Collection
