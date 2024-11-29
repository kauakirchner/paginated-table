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
import Pagination from './Pagination'
import Loading from './Loading'
import fetchUsers, { User, PaginatedResult } from './api'
import { useQuery } from '@tanstack/react-query'
import usePagination from './usePagination'

const UsersTable = () => {
  const {
    page,
    handleNextPage,
    searchParams,
    // handleFirstPage,
    handlePreviousPage
  } = usePagination()

  const { data, isLoading, error } = useQuery<PaginatedResult<User>>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(Number(searchParams.get('page') ?? 1))
  })

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
        onNextPage={() => handleNextPage(data?.totalPages)}
        onPreviousPage={handlePreviousPage}
        currentPage={Number(page) || 1}
      />
    </>
  )
}

export default UsersTable
