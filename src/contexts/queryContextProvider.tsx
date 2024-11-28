'use client'

import queryClient from '~/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
