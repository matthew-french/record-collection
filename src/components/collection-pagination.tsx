'use client'

import { useState, useCallback } from 'react'
import { Pagination } from 'react-headless-pagination'
import { Flex } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const [page, setPage] = useState<number>(0)

  const createQueryString = useCallback(
    (
      paramsToUpdate:
        | { name: string; value: string }[]
        | { name: string; value: string }
    ) => {
      const params = new URLSearchParams(searchParams.toString())

      console.log(params)

      // Ensure paramsToUpdate is always treated as an array
      const updatesArray = Array.isArray(paramsToUpdate)
        ? paramsToUpdate
        : [paramsToUpdate]

      updatesArray.forEach(({ name, value }) => {
        params.set(name, value)
      })

      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = (page: number) => {
    const value = `${page + 1}`

    setPage(page)

    const queryString = createQueryString([{ name: 'page', value }])

    router.push(`${basePath}?${queryString}`)
  }

  return (
    <nav>
      <Flex gap="{{ xs:'1', sm:'2', lg: '3'}}" direction="row" justify="center">
        <Pagination
          totalPages={totalPages}
          edgePageCount={1}
          middlePagesSiblingCount={1}
          currentPage={page}
          setCurrentPage={handlePageChange}
          className="flex flex-full flex-row items-center gap-1 sm:gap-2 lg:gap-3 justify-around"
          truncableText="-"
          truncableClassName="rt-reset p-1 rt-r-size-1 md:rt-r-size-2 rt-variant-surface"
        >
          <Pagination.PrevButton className="rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700">
            Previous
          </Pagination.PrevButton>

          <ul className="flex flex-row items-center gap-1 md:gap-3">
            <Pagination.PageButton
              activeClassName="outline outline-1 outline-blue-700"
              inactiveClassName=""
              className="rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700"
            />
          </ul>

          <Pagination.NextButton className="rt-reset rt-SelectTrigger rt-r-size-2 md:rt-r-size-3 rt-variant-surface cursor-pointer hover:outline hover:outline-1 hover:outline-blue-700">
            Next
          </Pagination.NextButton>
        </Pagination>
      </Flex>
    </nav>
  )
}

export default CollectionPagination
