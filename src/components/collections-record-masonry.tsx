import Image from 'next/image'
import Link from 'next/link'
import { CollectionsRecordImage } from '@/components/collections-record-image'

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
}

const CollectionsRecordMasonry: React.FC<RecordProps> = ({
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
}) => {
  const numbers = [300, 300, 300, 300, 150, 150, 150, 75, 75]
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]

  return (
    <div key={id} className="">
      <Link href="#">
        <CollectionsRecordImage
          src={`${coverImage || '/placeholder.svg'}`}
          alt={artist.name}
          width={randomNumber}
          height={randomNumber}
          className="object-contain rounded-sm"
        />
      </Link>
    </div>
  )
}

export default CollectionsRecordMasonry
