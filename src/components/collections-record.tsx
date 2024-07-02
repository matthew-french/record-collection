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

const CollectionsRecord: React.FC<RecordProps> = ({
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
}) => (
  <div
    key={id}
    className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden"
  >
    <div className="flex flex-col w-full">
      <div className="relative w-full flex-grow">
        <Link href="#">
          <CollectionsRecordImage
            src={`${coverImage || '/placeholder.svg'}`}
            alt={artist.name}
            width={640}
            height={640}
            className="object-contain rounded-sm"
          />
        </Link>
      </div>
      <div className="p-3 pb-1">
        <h3 className="font-semibold mt-1 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{artist.name}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{year}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{formats}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-1">
          {stringToPill(styles)}
          {stringToPill(genres)}
        </p>

        {/* <p className="text-gray-500 dark:text-gray-400 mb-2">Id: {artist.id}</p> */}
        {/* <p className="text-gray-500 dark:text-gray-400 mb-2">Resource URL: {artist.resourceUrl}</p> */}
        {/* <p className="text-gray-500 dark:text-gray-400 mb-2">Title: {title}</p> */}
        {/* <p className="text-gray-500 dark:text-gray-400 mb-2">Master URL: {masterUrl}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Resource URL: {resourceUrl}</p> */}
        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stringToPill(genres)}</p> */}
      </div>
    </div>
  </div>
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
