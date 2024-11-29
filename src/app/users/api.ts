import { PaginatedResult, User } from './users.type'

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`
  }))

const users = generateUsers(100)

const fetchUsers = async (page: number = 1): Promise<PaginatedResult<User>> => {
  if (page < 1) {
    throw new Error('Page and page size must be greater than 0.')
  }

  const pageSize = 10
  const totalUsers = users.length
  const totalPages = Math.ceil(totalUsers / pageSize)

  if (page > totalPages) {
    return {
      users: [],
      totalPages
    }
  }
  const startIndex = (page - 1) * pageSize

  if (startIndex >= totalUsers) {
    throw new Error('Page out of range.')
  }

  const endIndex = Math.min(startIndex + pageSize, totalUsers)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    users: users.slice(startIndex, endIndex),
    totalPages
  }
}

export default fetchUsers
