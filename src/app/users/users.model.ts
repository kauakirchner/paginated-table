import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import fetchUsers from './api'
import { PaginatedResult, User } from './users.type'

const usePagination = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const page = Number(searchParams.get('page')) || 1
  const urlParams = new URLSearchParams()

  const handleNextPage = (totalPages: number | undefined) => {
    if (page === totalPages) {
      return
    }
    const nextPage = page + 1
    urlParams.set('page', String(nextPage))
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const handlePreviousPage = () => {
    if (page === 1) {
      return
    }
    const nextPage = page - 1
    urlParams.set('page', String(nextPage))
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const handleFirstPage = () => {
    const urlParams = new URLSearchParams()
    urlParams.set('page', '1')
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const { data, isLoading, error } = useQuery<PaginatedResult<User>>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page)
  })

  return {
    page,
    handleNextPage,
    searchParams,
    handlePreviousPage,
    handleFirstPage,
    data,
    isLoading,
    error
  }
}

export default usePagination
