export type User = {
  id: number
  name: string
  email: string
}

export interface PaginatedResult<T> {
  users: T[]
  totalPages: number
}
