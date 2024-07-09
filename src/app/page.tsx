// Importing necessary components and functions
import Collections from '@/components/collections'
import { fetchRecordCollection } from '@/lib/discogs'
// Importing type definitions
import SearchParams from '@/types/SearchParams'

// Async function component to render the Home page
export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Destructuring and setting default values for search parameters
  const {
    page = '1',
    perPage = '48',
    sort = 'artist',
    sortOrder = 'asc',
  } = searchParams

  // Defining valid values for sortOrder
  const validSortOrders = ['asc', 'desc']

  // Defining valid fields that can be sorted
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

  // Validating and setting search parameters
  const params = {
    page: isNaN(parseInt(page)) || parseInt(page) < 1 ? '1' : page, // Ensuring 'page' is a positive integer, defaulting to '1'
    perPage: isNaN(parseInt(perPage)) || parseInt(perPage) < 1 ? '48' : perPage, // Ensuring 'perPage' is a positive integer, defaulting to '48'
    sort: validSorts.includes(sort) ? sort : 'artist', // Validating 'sort' parameter, defaulting to 'artist' if invalid
    sortOrder: validSortOrders.includes(sortOrder) ? sortOrder : 'asc', // Validating 'sortOrder', defaulting to 'asc' if invalid
  }

  // Fetching the record collection with validated parameters
  const res = await fetchRecordCollection(params)

  // Destructuring the response to get pagination and releases
  const { pagination, releases } = res

  // Rendering the main content of the page with Collections component
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-1 md:p-12">
      <Collections pagination={pagination} releases={releases} />
    </main>
  )
}
