import { useState, useEffect } from 'react'

/**
 * Hook to use on the body of components
 * that require fetching data on mount
 */
export function useFetch (url, options) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return data
}
