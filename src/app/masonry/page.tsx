import CollectionsMasonry from '@/components/collections-masonry'
import DiscogResponse from '@/types/DiscogResponse'

const DISCOGS_KEY = process.env.DISCOGS_CONSUMER_KEY
const DISCOGS_SECRET = process.env.DISCOGS_SECRET

interface SearchParams {
  page: string
  perPage: string
  sort: string
  sortOrder: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    page = '1',
    perPage = '40',
    sort = 'artist',
    sortOrder = 'asc',
  } = searchParams

  const validSortOrders = ['asc', 'desc']
  const validSorts = [
    'label',
    'artist',
    'title',
    'catno',
    'format',
    'rating',
    'added',
    'year',
  ]

  const validSortOrder = !validSorts.includes(sort) ? 'asc' : sortOrder
  const validSort = !validSortOrders.includes(sortOrder) ? 'artist' : sort
  const validPage = parseInt(page) ? parseInt(page) : 1
  const validPerPage = parseInt(perPage) ? parseInt(perPage) : 39

  const callAPI = async (): Promise<DiscogResponse> => {
    try {
      const res = await fetch(
        `https://api.discogs.com/users/munkle/collection/folders/0/releases?page=${validPage}&per_page=${validPerPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Discogs key=${DISCOGS_KEY}, secret=${DISCOGS_SECRET}`,
          },
        }
      )

      const data = await res.json()

      const { message } = data

      if (message) {
        throw new Error(message)
      }

      return data
    } catch (err) {
      console.log(err)
      throw new Error('Failed to fetch data from Discogs API' + err)
    }
  }

  const res = await callAPI()

  const { pagination, releases } = res

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-1 md:p-12">
      <CollectionsMasonry pagination={pagination} releases={releases} />
    </main>
  )
}
