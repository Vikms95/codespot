/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import PostPreview from './PostPreview'
import useFetch from '../hooks/useFetch'
import { getOptions } from '../services/requestParams'
import PostListContainer from '../wrappers/PostListContainer'
import { usePosts } from '../hooks/usePosts'
import styled from 'styled-components'

const StyledHome = styled.section`
`

function Home (props) {
  const { posts, setPosts, setLastClickedPostId, setIsModalActive } = props

  const response = useFetch('/api/posts', getOptions)

  usePosts(setPosts, response)
  useAuth()

  return (
    <StyledHome>
      {posts &&
      <>
        <PostListContainer>
          {posts.map((post) => (
            (post.public) &&
              <PostPreview
                key={post._id}
                id={post._id}
                user={post.user}
                title={post.title}
                text={post.text}
                image={post.image}
                timestamp={post.timestamp}
                setLastClickedPostId={setLastClickedPostId}
                setIsModalActive={setIsModalActive}
                >
              </PostPreview>
          ))}
        </PostListContainer>
      </>
}
    </StyledHome>
  )
}

export default Home
