'use client'
import { useState } from 'react'
import { Flex, Select } from '@radix-ui/themes'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

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
}

export default function CollectionSortBar({ items }: CollectionSortBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [sortOrder, setSortOrder] = useState('asc')
  const [sortField, setSortField] = useState('artist')
  const [perPage, setPerPage] = useState('48')

  const createQueryString = useCallback(
    (
      paramsToUpdate:
        | { name: string; value: string }[]
        | { name: string; value: string }
    ) => {
      const params = new URLSearchParams(searchParams.toString())

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

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)

    router.push(
      `${pathname}?${createQueryString([{ name: 'sortOrder', value }])}`
    )
  }

  const handleSortFieldChange = (value: string) => {
    setSortField(value)

    router.push(`${pathname}?${createQueryString([{ name: 'sort', value }])}`)
  }

  const handlePerPageChange = (value: string) => {
    setPerPage(value)

    const totalPages = Math.ceil(items / parseInt(value))
    const page = searchParams.get('page') || '1'

    if (parseInt(page) > totalPages) {
      router.push(
        `${pathname}?${createQueryString([
          { name: 'perPage', value },
          { name: 'page', value: totalPages.toString() },
        ])}`
      )

      return
    }

    router.push(`${pathname}?${createQueryString({ name: 'perPage', value })}`)
  }

  return (
    <Flex gap="3" display="flex">
      <Select.Root
        size="3"
        value={sortOrder}
        onValueChange={handleSortOrderChange}
      >
        <Select.Trigger>{sortOrderOptions[sortOrder]}</Select.Trigger>
        <Select.Content position="popper">
          {Object.keys(sortOrderOptions).map((order) => (
            <Select.Item key={order} value={order}>
              {order.toUpperCase()}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Select.Root
        size="3"
        value={sortField}
        onValueChange={handleSortFieldChange}
      >
        <Select.Trigger>{sortFieldOptions[sortField]}</Select.Trigger>
        <Select.Content position="popper">
          {Object.keys(sortFieldOptions).map((field) => (
            <Select.Item key={field} value={field}>
              {sortFieldOptions[field]}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Select.Root size="3" value={perPage} onValueChange={handlePerPageChange}>
        <Select.Trigger>{perPageOptions[perPage]}</Select.Trigger>
        <Select.Content position="popper">
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
