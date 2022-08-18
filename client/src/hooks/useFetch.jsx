import { useState, useEffect } from 'react'

/**
 * Hook to use on the body of components
 * that require fetching data on mount
 */
function useFetch (url, options) {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    fetch(url, options)
      .then(response => response.json())
      .then(data => setResponse(data))
  }, [])

  return response
}

export default useFetch
