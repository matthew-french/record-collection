import { Grid, Box } from '@radix-ui/themes'
import CollectionsRecord from './collections-record'

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
  labels: string
}

const Collections = ({ pagination, releases }: DiscogResponse) => {
  const products: Product[] = releases.map(
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
    <Box p="4">
      <Grid
        columns={{ initial: '2', md: '3', lg: '4' }}
        gap="4"
        width="auto"
        align="start"
        justify={{ initial: 'center' }}
      >
        {products.map((product, index) => (
          <CollectionsRecord key={`${product.id}-${index}`} {...product} />
        ))}
      </Grid>
    </Box>
  )
}

export default Collections
