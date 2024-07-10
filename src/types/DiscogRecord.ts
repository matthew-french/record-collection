type Record = {
  coverImage: string
  id: number
  thumb: string
  year: number
  title: string
  genres: string
  artist: string
  styles: string
  masterUrl: string
  resourceUrl: string
  formats: string
}

interface DiscogRecord {
  id: number
  instance_id: number
  date_added: string
  rating: 0
  basic_information: BasicInformation
}

interface BasicInformation {
  cover_image: string
  id: number
  thumb: string
  year: number
  title: string
  genres: string[]
  styles: string[]
  artists: Artist[]
  master_url: string
  resource_url: string
  formats: Formats[]
  labels: Labels[]
}

interface Formats {
  descriptions: string[]
  name: string
  qty: string
  text: string
}

interface Labels {
  resource_url: string
  entity_type: string
  catno: string
  id: number
  name: string
}

interface Artist {
  anv: string
  id: string
  name: string
  resource_url: string
  role: string
  tracks: string
}

// export all interfaces
export type { Record, DiscogRecord, BasicInformation, Formats, Artist }
