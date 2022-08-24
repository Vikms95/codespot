import { useEffect, useState } from 'react'

function usePost (postid, posts) {
  const [post, setPost] = useState('')

  useEffect(() => {
    if (posts) {
      const postToReturn = posts.find(post => post._id === postid)
      setPost(postToReturn)
    }
  }, [posts, postid])
  return post
}

export default usePost
