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

  const params = {
    page: parseInt(page) ? parseInt(page).toString() : '1',
    perPage: parseInt(perPage) ? parseInt(perPage).toString() : '48',
    sort: !validSorts.includes(sort) ? 'artist' : sort,
    sortOrder: !validSortOrders.includes(sortOrder) ? 'asc' : sortOrder,
  }

  const res = await fetchRecordCollection(params)

  const { pagination, releases } = res

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-1 md:p-12">
      <Collections pagination={pagination} releases={releases} />
    </main>
  )
}
