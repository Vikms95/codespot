/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Post (props) {
  const { user: currentUserId } = useContext(AuthContext)
  const { _id, user, title, text, isPrivate } = props

  const handleUpdate = async (e) => {

  }

  const handleDelete = async (e) => {
    // Fetch for DELETE request with id as param
    fetch(`/api/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    // If successfully deleted refresh page
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
        <button onClick={handleDelete}>Delete</button>
      </>
      }
    </>
  )
}

export default Post
