import { useState, useEffect } from 'react'

export function useImage (post) {
  const [imageSrc, setImageSrc] = useState()

  useEffect(() => {
    if (post) {
      fetch('/images/' + post.image)
        .then(res => {
          setImageSrc(res || '')
        })
    }
  }, [post])

  return imageSrc
}
