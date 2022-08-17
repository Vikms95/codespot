/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Post (props) {
  const { user, title, text, isPrivate, setIsModalActive } = props

  const { user: currentUserId } = useContext(AuthContext)

  const handleUpdate = async (e) => {

  }

  const revealDeleteModal = () => {
    setIsModalActive(true)
    // Reveal a modal which will ask for confirmation
  }

  // const handleDelete = (e) => {
  //   // Fetch for DELETE request with id as param
  //   fetch(`/api/posts/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json; charset=UTF-8'
  //     }
  //   })
  // }

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
