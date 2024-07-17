'use client'

import { useState } from 'react'
import { Pagination } from 'react-headless-pagination'
import { Flex } from '@radix-ui/themes'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/hooks/useCreateQueryString'

interface CollectionPaginationProps {
  totalPages: number
  perPage: number
  basePath: string
}

const CollectionPagination = ({
  totalPages,
  perPage,
  basePath,
}: CollectionPaginationProps) => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [page, setPage] = useState<number>(0)

  const createQueryString = useCreateQueryString(searchParams)

  const handlePageChange = (page: number) => {
    const value = `${page + 1}`

    setPage(page)

    const queryString = createQueryString([{ name: 'page', value }])

    replace(`${pathname}?${queryString}`)
    // router.push(`${basePath}?${queryString}`)
  }

  return (
    <nav>
      <Flex gap="{{ xs:'1', sm:'2', lg: '3'}}" direction='row' justify='center'>
        <Pagination
          totalPages={totalPages}
          edgePageCount={1}
          middlePagesSiblingCount={1}
          currentPage={page}
          setCurrentPage={handlePageChange}
          className='flex-full flex flex-row items-center justify-around gap-1 sm:gap-2 lg:gap-3'
          truncableText='-'
          truncableClassName='rt-reset p-1 rt-r-size-1 md:rt-r-size-2 rt-variant-surface'
        >
          <Pagination.PrevButton className='rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700'>
            Previous
          </Pagination.PrevButton>

          <ul className='flex flex-row items-center gap-1 md:gap-3'>
            <Pagination.PageButton
              activeClassName='outline outline-1 outline-blue-700'
              inactiveClassName=''
              className='rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700'
            />
          </ul>

          <Pagination.NextButton className='rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700'>
            Next
          </Pagination.NextButton>
        </Pagination>
      </Flex>
    </nav>
  )
}

export default CollectionPagination
