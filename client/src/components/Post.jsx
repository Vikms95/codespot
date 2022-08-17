/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Post (props) {
  const { user: authoredUser } = useContext(AuthContext)
  const { user, title, text, isPrivate } = props
  return (
    <>
      <div>Username: {user.username}</div>
      <div>Title: {title}</div>
      <div>Text: {text}</div>
      <div>Private? {isPrivate.toString()}</div>
      {/* Be aware of objects in the way of comparison */}
      {(user._id === authoredUser) &&
      <>
        <button>Edit</button>
        <button>Delete</button>
      </>
      }
    </>
  )
}

export default Post
