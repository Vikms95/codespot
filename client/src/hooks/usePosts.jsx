import { useEffect } from 'react'

export function usePosts (setter, response) {
  useEffect(() => {
    setter(response)
  }, [response])
  return response
}
