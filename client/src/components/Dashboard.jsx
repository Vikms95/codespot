/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import PostListContainer from '../wrappers/PostListContainer'
import PostContainer from '../wrappers/PostContainer'
import Post from './Post'
import useFetch from '../hooks/useFetch'
import { getOptions } from '../services/requestParams'

// const StyledDashboard = styled.section`

// `

function Dashboard (props) {
  const { posts, setPosts, setLastClickedPostId, setIsModalActive } = props
  const { user } = useContext(AuthContext)

  const response = useFetch(`/api/${user}/posts`, getOptions)

  useEffect(() => {
    setPosts(response)
  }, [response])

  return (
    <section className='dashboard-container'>
      {posts &&
        <>
          <PostListContainer title='Published post'>
            {posts.map((post) => (
              (!post.private) &&

              <PostContainer>
                <Post
                  key={post._id}
                  id={post._id}
                  user={post.user}
                  title={post.title}
                  text={post.text}
                  isPrivate={post.private}
                  setLastClickedPostId={setLastClickedPostId}
                  setIsModalActive={setIsModalActive}
                >
                </Post>
              </PostContainer>

            ))}
          </PostListContainer>

          <PostListContainer title='Unpublished post'>

            {posts.map((post) => (
              (post.private) &&
                <PostContainer>
                  <Post
                    key={post._id}
                    id={post._id}
                    user={post.user}
                    title={post.title}
                    text={post.text}
                    setLastClickedPostId={setLastClickedPostId}
                    setIsModalActive={setIsModalActive}
                  >
                </Post>
              </PostContainer>
            ))}

          </PostListContainer>
        </>
      }
    </section>
  )
}

export default Dashboard
