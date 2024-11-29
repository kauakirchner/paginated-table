'use client'

import usePagination from './users.model'
import UsersTableView from './users.view'

export default function Home() {
  const paginationMethods = usePagination()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <UsersTableView {...paginationMethods} />
      </div>
    </div>
  )
}
