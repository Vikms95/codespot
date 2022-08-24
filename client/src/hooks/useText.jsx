import { useEffect } from 'react'

function useText (ref, text) {
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = text
    }
  })
}

export { useText }
