import { useState } from 'react'

type UsePaginationOptions = {
  page?: number
  limit?: number
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { page = 1, limit = 10 } = options
  const [pagination, setPagination] = useState<Required<UsePaginationOptions>>({ page, limit })
  const pageOffset = (pagination.page - 1) * pagination.limit

  return { pagination, pageOffset, setPagination }
}
