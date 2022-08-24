import { useEffect } from 'react'

function usePost (postid, posts) {
  let post

  useEffect(() => {
    // if (posts) {
    console.log(postid)
    post = posts.find(post => {
      console.log(post._id, postid)
      return post._id === postid
    })
    // }
  })
  return { post }
}

export default usePost
