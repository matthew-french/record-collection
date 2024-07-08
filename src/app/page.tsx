import Collections from '@/components/collections'
import { fetchRecordCollection } from '@/lib/fetchRecordCollection'
import SearchParams from '@/types/SearchParams'

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    page = '1',
    perPage = '48',
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
  const validPerPage = parseInt(perPage) ? parseInt(perPage).toString() : '48'
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
      <Collections pagination={pagination} releases={releases} />
    </main>
  )
}
