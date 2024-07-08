import React from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'

interface PaginationProps {
  currentPage: number
  totalPages: number
  perPage: number
  basePath: string
}

const collectionPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  basePath,
}) => {
  const getPaginationUrl = (page: number) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      sort: 'artist',
      sortOrder: 'asc',
    }).toString()

    return `${basePath}?${queryParams}`
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={getPaginationUrl(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            // Only show iteam if it with 3 of the current page when on mobile

            <PaginationItem
              key={pageNumber}
              className={
                Math.abs(pageNumber - currentPage) > 1
                  ? 'hidden md:flex'
                  : 'flex'
              }
            >
              <PaginationLink
                className={
                  Math.abs(pageNumber - currentPage) > 1
                    ? 'hidden md:flex'
                    : 'flex'
                }
                href={getPaginationUrl(pageNumber)}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={getPaginationUrl(Math.max(1, currentPage + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default collectionPagination
