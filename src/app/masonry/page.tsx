import CollectionsMasonry from '@/components/collections-masonry'
import { fetchRecordCollection } from '@/lib/data'
import SearchParams from '@/types/SearchParams'

export default async function Masonry({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    page = '1',
    perPage = '50',
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

  const validPage = parseInt(page) ? parseInt(page).toString() : '1'
  const validPerPage = parseInt(perPage) ? parseInt(perPage).toString() : '50'
  const validSort = !validSortOrders.includes(sortOrder) ? 'artist' : sort
  const validSortOrder = !validSorts.includes(sort) ? 'asc' : sortOrder

  const res = await fetchRecordCollection({
    page: validPage,
    perPage: validPerPage,
    sort: validSort,
    sortOrder: validSortOrder,
  })

  const { pagination, releases } = res

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-1 md:p-12">
      <CollectionsMasonry pagination={pagination} releases={releases} />
    </main>
  )
}
