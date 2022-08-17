/* eslint-disable react/prop-types */
import React from 'react'

function Post (props) {
  const { username, title, text, isPrivate } = props
  return (
    <>
      <div>Username: {username}</div>
      <div>Title: {title}</div>
      <div>Text: {text}</div>
      <div>Private? {isPrivate.toString()}</div>
    </>
  )
}

export default Post
