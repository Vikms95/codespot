/* eslint-disable react/prop-types */
import React from 'react'
import { deleteOptions } from '../services/requestParams'

function Modal (props) {
  const { lastClickedPostId, setIsModalActive, setPosts } = props

  const handleDelete = () => {
    fetch(`/api/posts/${lastClickedPostId}`, deleteOptions)

    setPosts(prevPosts => (
      prevPosts.filter(post => post._id !== lastClickedPostId)
    ))

    setIsModalActive(false)
  }

  const handleCancel = () => {
    setIsModalActive(false)
  }

  return (
      <>
        <div> Are you sure you want to delete this post? </div>
        <button onClick={handleCancel}> Cancel</button>
        <button onClick={handleDelete}> Delete</button>
      </>
  )
}

export default Modal
