import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const usePagination = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const page = searchParams.get('page')
  const urlParams = new URLSearchParams()

  if (!page) {
    urlParams.set('page', String(1))
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const handleNextPage = (totalPages: number | undefined) => {
    if (Number(page) === totalPages) {
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

  const handleFirstPage = () => {
    const urlParams = new URLSearchParams()
    urlParams.set('page', '1')
    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  return {
    page,
    handleNextPage,
    searchParams,
    handlePreviousPage,
    handleFirstPage
  }
}

export default usePagination
