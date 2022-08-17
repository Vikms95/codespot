/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ModalContainer from '../containers/ModalContainer'
import Modal from './Modal'
import Post from './Post'
import useFetch from '../hooks/useFetch'

function Dashboard (props) {
  const { posts, setPosts, lastClickedPostId, setLastClickedPostId } = props

  const { user } = useContext(AuthContext)

  useFetch(`/api/${user}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then(data => setPosts(data))

  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <section className='dashboard-container'>
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

export default Dashboard
