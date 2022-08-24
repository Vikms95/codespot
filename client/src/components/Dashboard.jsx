/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import PostListContainer from '../wrappers/PostListContainer'
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
          <PostListContainer title='Published posts'>
            {posts.map((post) => (
              (post.public) &&

                <Post
                  key={post._id}
                  id={post._id}
                  user={post.user}
                  title={post.title}
                  text={post.text}
                  image={post.image}
                  timestamp={post.timestamp}
                  isPublic={post.public}
                  setLastClickedPostId={setLastClickedPostId}
                  setIsModalActive={setIsModalActive}
                >
                </Post>

            ))}
          </PostListContainer>

          <PostListContainer title='Unpublished posts'>

            {posts.map((post) => (
              (!post.public) &&
                  <Post
                    key={post._id}
                    id={post._id}
                    user={post.user}
                    title={post.title}
                    text={post.text}
                    timestamp={post.timestamp}
                    setLastClickedPostId={setLastClickedPostId}
                    setIsModalActive={setIsModalActive}
                  >
                </Post>
            ))}

          </PostListContainer>
        </>
      }
    </section>
  )
}

export default Dashboard
