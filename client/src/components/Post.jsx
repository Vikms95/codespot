/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Post (props) {
  const { id, user, title, text, isPrivate, setIsModalActive, setLastClickedPostId } = props

  const { user: currentUserId } = useContext(AuthContext)

  const handleUpdate = async (e) => {

  }

  const revealDeleteModal = () => {
    setIsModalActive(true)
    setLastClickedPostId(id)
  }

  return (
    <>
      <div>Username: {user.username}</div>
      <div>Title: {title}</div>
      <div>Text: {text}</div>
      <div>Private? {isPrivate.toString()}</div>
      {/* Be aware of objects in the way of comparison */}
      {(user._id === currentUserId) &&
      <>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={revealDeleteModal}>Delete</button>
      </>
      }
    </>
  )
}

export default Post
