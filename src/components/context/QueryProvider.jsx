import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'

export default function QueryProvider ({ children }) {
  const { clearSession } = useAuth()

  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        onError: err => {
          if (err.response?.status === 401) {
            clearSession()
            toast.error('Session expired, please login again')
            return
          }
          toast.error(err.response?.data?.message || err.message || 'Something went wrong')
        }
      },
      mutations: {
        onError: err => {
          if (err.response?.status === 401) {
            clearSession()
            toast.error('Session expired, please login again')
            return
          }
          toast.error(err.response?.data?.message || err.message || 'Something went wrong')
        }
      }
    }
  }), [clearSession])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}