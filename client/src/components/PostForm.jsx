import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createResourceOptions } from '../services/requestParams'
import AuthContext from '../context/AuthContext'

function PostForm () {
  const { postid } = useParams()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPrivate: false
  })

  const { title, text, isPrivate } = formData

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isPrivate: e.target.checked || prevFormData.isPrivate,
      [e.target.name]: e.target.value
    }))
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()

    const response = fetch('/api/post',
      createResourceOptions('POST', { user, title, text, isPrivate })
    )

    const postIsCreated = await response

    if (postIsCreated) {
      return navigate('/dashboard')
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = fetch('/api/posts/' + postid,
      createResourceOptions('PUT', { user, title, text, isPrivate })
    )

    const postIsUpdated = await response

    if (postIsUpdated) {
      return navigate('/dashboard')
    }
  }

  return (
    <section>
      <form action="" onSubmit={postid ? handleUpdateSubmit : handlePostSubmit }>
        <label htmlFor="title">Title: </label>
        <input type="text" name='title' onChange={handleChange} placeholder='Post title ...' />
        <br />
        <label htmlFor="text">Post: </label>
        <textarea type="text" name='text' onChange={handleChange} placeholder='Post body ...' />
        <br />
        <label htmlFor="privacy">Should we keep this post private?</label>
        <input type="checkbox" name='privacy' onChange={handleChange} />
        <br />
        <button type='submit'>{postid ? 'Update post' : 'Submit post'}</button>
      </form>
    </section>
  )
}

export default PostForm
