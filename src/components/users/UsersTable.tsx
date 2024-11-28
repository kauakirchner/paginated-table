'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter
} from '~/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import fetchUsers, { User, PaginatedResult } from './api'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Pagination from './Pagination'
import Loading from './Loading'

const UsersTable = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const page = searchParams.get('page')
  const urlParams = new URLSearchParams()

  const { data, isLoading, error } = useQuery<PaginatedResult<User>>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(Number(searchParams.get('page')))
  })

  const handleNextPage = () => {
    if (Number(page) === data?.totalPages) {
      return
    }
    const nextPage = Number(page) + 1
    urlParams.set('page', String(nextPage))
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const handlePreviousPage = () => {
    if (Number(page) === 1) {
      return
    }
    const nextPage = Number(page) - 1
    urlParams.set('page', String(nextPage))
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  // const handleFirstPage = () => {
  //   const urlParams = new URLSearchParams()
  //   urlParams.set('page', '1')
  //   router.replace(`${pathname}?${urlParams.toString()}`)
  // }

  if (error) {
    return <span>unexpected error</span>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>E-mail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{data?.users?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        currentPage={Number(page) || 1}
      />
    </>
  )
}

export default UsersTable
