import { useEffect, useState } from 'react'

export function usePost (postid, posts) {
  const [post, setPost] = useState('')

  useEffect(() => {
    if (posts) {
      const postToReturn = posts.find(post =>
        (post._id === postid)
      )

      setPost(postToReturn)
    }
  }, [])

  return post
}
