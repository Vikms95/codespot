import { useState, useEffect } from 'react'

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
