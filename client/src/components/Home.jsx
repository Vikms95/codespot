/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Modal from './Modal'
import Post from './Post'
import useFetch from '../hooks/useFetch'
import { getOptions } from '../services/requestParams'
import ModalWrapper from '../wrappers/ModalWrapper'
import PostListContainer from '../wrappers/PostListContainer'
import PostContainer from '../wrappers/PostContainer'

function Home (props) {
  const { posts, setPosts, lastClickedPostId, setLastClickedPostId } = props

  const [isModalActive, setIsModalActive] = useState(false)

  const response = useFetch('/api/posts', getOptions)

  useEffect(() => {
    setPosts(response)
  }, [response])

  useAuth()

  return (
    <section className='home-container'>
      {posts &&
      <>
        <ModalWrapper
          isModalActive={isModalActive}
        >
          <Modal
            setPosts={setPosts}
            lastClickedPostId={lastClickedPostId}
            setIsModalActive={setIsModalActive}
          />
        </ModalWrapper>
        <PostListContainer>
          {posts.map((post) => (
            (!post.private) &&
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

export default Home
