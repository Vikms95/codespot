/* eslint-disable react/prop-types */
import React from 'react'

function Modal (props) {
  const { lastClickedPostId } = props

  const handleDelete = (e) => {
    // Fetch for DELETE request with id as param
    fetch(`/api/posts/${lastClickedPostId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
  return (
      <>
        <div> Are you sure you want to delete this post? </div>
        <button > Cancel</button>
        <button onClick={handleDelete} > Delete</button>
      </>
  )
}

export default Modal
