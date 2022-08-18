/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createResourceOptions } from '../services/requestParams'
import AuthContext from '../context/AuthContext'

function PostForm (props) {
  const { posts } = props
  const { postid } = useParams() || localStorage.getItem('posttoupdate')
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPrivate: false
  })

  const { title, text, isPrivate } = formData

  useEffect(() => {
    if (postid) {
      console.log(posts)
      localStorage.setItem('posttoupdate', postid)
      const postToUpdate = posts.find(post => post._id === postid)
      console.log(postToUpdate)
      setFormData(() => {
        return {
          title: postToUpdate.title,
          text: postToUpdate.text,
          isPrivate: postToUpdate.private
        }
      })
    }
    // Find the post in the posts array that has the same _id value as the postid
    // Use setFormData and substitute the empty values to the values from the found post
  }, [])

  const handleChange = (e) => {
    console.log(e.target)
    setFormData((prevFormData) => ({
      ...prevFormData,
      isPrivate: e.target.type === 'checkbox' ? !prevFormData.isPrivate : prevFormData.isPrivate,
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
        <input type="text" name='title' onChange={handleChange} placeholder='Post title ...' value={formData.title} />
        <br />
        <label htmlFor="text">Post: </label>
        <textarea type="text" name='text' onChange={handleChange} placeholder='Post body ...' value={formData.text} />
        <br />
        <label htmlFor="privacy">Should we keep this post private?</label>
        <input type="checkbox" name='privacy' onChange={handleChange} checked={formData.isPrivate} />
        <br />
        <button type='submit'>{postid ? 'Update post' : 'Submit post'}</button>
      </form>
    </section>
  )
}

export default PostForm
