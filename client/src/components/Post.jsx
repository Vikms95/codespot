/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostsContext from '../context/PostsContext'
import usePost from '../hooks/usePost'
import styled from 'styled-components'
import { usePosts } from '../hooks/usePosts'
import { useHtmlAsText } from '../hooks/useText'

const StyledPost = styled.section`
  margin: 5em;
  display: flex;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 5em;
`

const Text = styled.p`
  
`

function Post (props) {
  const { postid } = useParams()
  // const { posts } = useContext(PostsContext)
  const { posts } = props
  const post = usePost(postid, posts)
  const textRef = useRef(null)

  useHtmlAsText(textRef, post.text)

  return (
    <StyledPost>
      <Title>{post.title}</Title>
      <Text ref={textRef}></Text>
    </StyledPost>
  )
}

export default Post
