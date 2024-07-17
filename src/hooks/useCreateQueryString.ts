import type { ReadonlyURLSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface ParamsToUpdate {
  name: string
  value: string
}

interface ParamsToUpdateArray {
  [index: number]: ParamsToUpdate
}

export default function useCreateQueryString(
  searchParams: ReadonlyURLSearchParams
) {
  const createQueryString = useCallback(
    (paramsToUpdate: ParamsToUpdate | ParamsToUpdateArray) => {
      const params = new URLSearchParams(searchParams.toString())

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

  return createQueryString
}
