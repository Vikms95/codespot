/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import PostPreview from './PostPreview'
import { useFetch } from '../hooks/useFetch'
import { getOptions } from '../services/requestParams'
import PostListContainer from '../wrappers/PostListContainer'
import styled from 'styled-components'

const StyledHome = styled.section`
`

function Home (props) {
  useAuth()

  const {
    posts,
    setPosts,
    setLastClickedPostId,
    setIsModalActive
  } = props

  const data = useFetch('/api/posts', getOptions)

  useEffect(() => {
    setPosts(data)
  }, [data])

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
