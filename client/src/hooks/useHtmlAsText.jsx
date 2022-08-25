import { useEffect } from 'react'

function useHtmlAsText (ref, text) {
  useEffect(() => {
    if (text) {
      ref.current.innerHTML = text
    }
  }, [text])
}

export { useHtmlAsText }
