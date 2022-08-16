import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function CreatePost () {
  const navigate = useNavigate()
  const user = useOutletContext()

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPrivate: false
  })

  const { title, text, isPrivate } = formData

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    const response = fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        user: user.user,
        title,
        text,
        isPrivate
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    const postIsCreated = await response
    if (postIsCreated) {
      return navigate('/dashboard')
    }
  }

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name='title' onChange={handleChange} placeholder='Post title ...' />
        <br />
        <label htmlFor="text">Post: </label>
        <textarea type="text" name='text' onChange={handleChange} placeholder='Post body ...' />
        <br />
        <label htmlFor="privacy">Should we keep this post private?</label>
        <input type="checkbox" name='privacy' onChange={handleChange} />
        <br />
        <button type='submit'>Submit post</button>
      </form>
    </section>
  )
}

export default CreatePost
