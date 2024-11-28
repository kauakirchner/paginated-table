'use client'

import {
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
  Pagination as ShadPagination
} from '../ui/pagination'

interface Props {
  onNextPage: () => void
  onPreviousPage: () => void
  currentPage: number
}

const Pagination = ({ onNextPage, onPreviousPage, currentPage }: Props) => {
  return (
    <ShadPagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={onNextPage} />
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  )
}

export default Pagination
