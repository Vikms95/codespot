import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import PostsContext from '../context/PostsContext'
import usePost from '../hooks/usePost'

function Post () {
  const { postid } = useParams()
  const { posts } = useContext(PostsContext)
  const { post } = usePost(postid, posts)

  return (
    <>
    <div>{console.log(post._id)}</div>
    <div>{console.log(postid)}</div>

    </>
  )
}

export default Post
