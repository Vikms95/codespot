/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ModalContainer from '../containers/ModalContainer'
import Modal from './Modal'
import Post from './Post'
import useFetch from '../hooks/useFetch'
import { getOptions } from '../services/requestParams'

function Dashboard (props) {
  const { posts, setPosts, lastClickedPostId, setLastClickedPostId } = props
  const { user } = useContext(AuthContext)
  const [isModalActive, setIsModalActive] = useState(false)

  const response = useFetch(`/api/${user}/posts`, getOptions)

  useEffect(() => {
    setPosts(response)
  }, [response])

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
