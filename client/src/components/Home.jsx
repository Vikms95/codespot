/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import ModalContainer from '../containers/ModalContainer'
import Modal from './Modal'
import Post from './Post'
import useFetch from '../hooks/useFetch'

function Home (props) {
  const { posts, setPosts, lastClickedPostId, setLastClickedPostId } = props

  useAuth()
  useFetch('/api/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then(data => setPosts(data))

  // useEffect(() => {
  //   fetch('/api/posts', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json; charset=UTF-8'
  //     }
  //   }).then(response => response.json())
  //     .then(postsData => setPosts(postsData))
  // }, [])

  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <section className='home-container'>
      {posts &&
      <>
        <ModalContainer
          isModalActive={isModalActive}
        >
          <Modal
            setPosts={setPosts}
            lastClickedPostId={lastClickedPostId}
            setIsModalActive={setIsModalActive}
          />
        </ModalContainer>

        {posts.map((post) => (
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
        ))}
      </>
}
    </section>
  )
}

export default Home
