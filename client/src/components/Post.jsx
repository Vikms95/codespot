/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostsContext from '../context/PostsContext'
import usePost from '../hooks/usePost'
import styled from 'styled-components'
import { usePosts } from '../hooks/usePosts'

const StyledPost = styled.section`
  display: flex;
`

function Post (props) {
  const { postid } = useParams()
  // const { posts } = useContext(PostsContext)
  const { posts } = props
  const post = usePost(postid, posts)

  return (
    <StyledPost>
    <div>{post.title}</div>
    <div>{postid}</div>

    </StyledPost>
  )
}

export default Post
