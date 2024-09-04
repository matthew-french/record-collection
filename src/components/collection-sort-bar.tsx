'use client'

import { useState } from 'react'
import { Flex, Select } from '@radix-ui/themes'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import useCreateQueryString from '@/hooks/useCreateQueryString'

interface CollectionSortBarProps {
  items: number
}

const sortOrderOptions: { [key: string]: string } = {
  asc: 'ASC',
  desc: 'DESC',
}

const sortFieldOptions: { [key: string]: string } = {
  artist: 'ARTIST',
  title: 'TITLE',
  label: 'LABEL',
  year: 'YEAR',
}

const perPageOptions: { [key: string]: string } = {
  12: '12',
  24: '24',
  48: '48',
  60: '60',
  100: '100',
}

export default function CollectionSortBar({ items }: CollectionSortBarProps) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('artist')
  const [perPage, setPerPage] = useState('12')

  const createQueryString = useCreateQueryString(searchParams)

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)
    const queryString = createQueryString([{ name: 'sortOrder', value }])

    replace(`${pathname}?${queryString}`)
  }

  const handleSortFieldChange = (value: string) => {
    setSortField(value)
    const queryString = createQueryString([{ name: 'sort', value }])

    replace(`${pathname}?${queryString}`)
  }

  const handlePerPageChange = (value: string) => {
    setPerPage(value)

    const page = searchParams.get('page') || '1'
    const totalPages = Math.ceil(items / parseInt(value))
    const isPageGreaterThanTotalPages = parseInt(page) > totalPages

    const queryString = createQueryString([
      { name: 'perPage', value },
      {
        name: 'page',
        value: isPageGreaterThanTotalPages ? `${totalPages}` : page,
      },
    ])

    replace(`${pathname}?${queryString}`)
  }

  return (
    <Flex gap='3' direction='row' justify='center'>
      <Select.Root
        size='3'
        value={sortOrder}
        onValueChange={handleSortOrderChange}
      >
        <Select.Trigger>{sortOrderOptions[sortOrder]}</Select.Trigger>
        <Select.Content position='popper'>
          {Object.keys(sortOrderOptions).map((order) => (
            <Select.Item key={order} value={order}>
              {order.toUpperCase()}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root
        size='3'
        value={sortField}
        onValueChange={handleSortFieldChange}
      >
        <Select.Trigger>{sortFieldOptions[sortField]}</Select.Trigger>
        <Select.Content position='popper'>
          {Object.keys(sortFieldOptions).map((field) => (
            <Select.Item key={field} value={field}>
              {sortFieldOptions[field]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root size='3' value={perPage} onValueChange={handlePerPageChange}>
        <Select.Trigger>{perPageOptions[perPage]}</Select.Trigger>
        <Select.Content position='popper'>
          {Object.keys(perPageOptions).map((size) => (
            <Select.Item key={size} value={size}>
              {perPageOptions[size]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
