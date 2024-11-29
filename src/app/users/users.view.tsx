import Loading from '~/components/ui/loading'
import Pagination from './pagination'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter
} from '../../components/ui/table'
import usePagination from './users.model'

type Props = ReturnType<typeof usePagination>

const UsersTableView = ({
  data,
  isLoading,
  error,
  page,
  handleNextPage,
  handlePreviousPage
}: Props) => {
  if (error) {
    console.log('err: ', error)
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
          {data?.users.map((user) => (
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
            <TableCell className="text-right">{data?.users.length}</TableCell>
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

export default UsersTableView
