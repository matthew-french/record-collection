// Importing necessary components and functions
import Collection from '@/components/collection'
import { fetchRecordCollection } from '@/lib/discogs'
// Importing type definitions
import SearchParams from '@/types/SearchParams'

import CollectionSortBar from '@/components/collection-sort-bar'
import CollectionPagination from '@/components/collection-pagination'

import { Flex, Container } from '@radix-ui/themes'

import { Suspense } from 'react'

// Async function component to render the Home page
export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Destructuring and setting default values for search parameters
  const {
    page = '1',
    perPage = '12',
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

  const validPerPage = ['12', '24', '48', '60', '100']

  // Validating and setting search parameters
  const params = {
    page: isNaN(parseInt(page)) || parseInt(page) < 1 ? '1' : page, // Ensuring 'page' is a positive integer, defaulting to '1'
    perPage: validPerPage.includes(perPage) ? perPage : '12', // Validating 'perPage' parameter, defaulting to '48' if invalid
    sort: validSorts.includes(sort) ? sort : 'artist', // Validating 'sort' parameter, defaulting to 'artist' if invalid
    sortOrder: validSortOrders.includes(sortOrder) ? sortOrder : 'asc', // Validating 'sortOrder', defaulting to 'asc' if invalid
  }

  // Fetching the record collection with validated parameters
  const res = await fetchRecordCollection(params)

  // Destructuring the response to get pagination and releases
  const { pagination, releases } = res

  const items = pagination.items

  // Rendering the main content of the page with Collection component
  return (
    <main className='mb-20'>
      <Container size='4' display='initial'>
        <Flex direction='column' gap='3' pt='3'>
          <CollectionSortBar items={items} />
          <CollectionPagination
            totalPages={pagination.pages}
            perPage={pagination.per_page}
            basePath='/'
          />
          <Suspense
            key={page + perPage + sort + sortOrder}
            fallback={
              <div className='flex h-96 items-center justify-center'>
                <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
              </div>
            }
          >
            <Collection releases={releases} />
          </Suspense>
          <CollectionPagination
            totalPages={pagination.pages}
            perPage={pagination.per_page}
            basePath='/'
          />
        </Flex>
      </Container>
    </main>
  )
}
