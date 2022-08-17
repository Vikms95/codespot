/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ModalContainer from '../containers/ModalContainer'
import Modal from './Modal'
import Post from './Post'

function Dashboard (props) {
  const { posts, setPosts, lastClickedPostId, setLastClickedPostId } = props

  const { user } = useContext(AuthContext)

  const [isModalActive, setIsModalActive] = useState(false)

  useEffect(() => {
    fetch(`/api/${user}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(postsData => setPosts(postsData))
  }, [])

  return (
    <section className='dashboard-container'>
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
    </section>
  )
}

export default Dashboard
