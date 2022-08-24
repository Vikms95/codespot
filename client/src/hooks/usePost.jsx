import { useEffect, useState } from 'react'

function usePost (postid, posts) {
  const [post, setPost] = useState()
  useEffect(() => {
    if (posts) {
      setPost(posts.find(post => {
        console.log(post)
        console.log(post._id)
        return post._id === postid
      }))
    }
  })
  return { post }
}

export default usePost
