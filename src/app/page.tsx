import UsersTable from '~/components/users/UsersTable'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <UsersTable />
      </div>
    </div>
  )
}
