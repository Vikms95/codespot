/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postCreateOptions } from '../services/requestParams'
import { getPostToUpdate } from '../services/getPostToUpdate'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

function PostForm (props) {
  const { posts } = props
  const { postid } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPrivate: false,
    image: ''
  })

  const { title, text, isPrivate, image } = formData

  useEffect(() => {
    if (postid) {
      const postToUpdate = getPostToUpdate(posts, postid)

      setFormData(() => {
        return {
          title: postToUpdate.title,
          text: postToUpdate.text,
          isPrivate: postToUpdate.private,
          image: postToUpdate.image
        }
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isPrivate: (e.target.type === 'checkbox')
        ? !prevFormData.isPrivate
        : prevFormData.isPrivate,
      image: (e.target.name === 'image')
        ? e.target.files[0]
        : prevFormData.image,
      [e.target.name]: e.target.value
    }))
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()

    const formDataRequest = new FormData()

    formDataRequest.append('image', image)

    axios.post('http://localhost:4000/api/post', formDataRequest, {
    })
      .then(res => console.log(res))

    // const request = new XMLHttpRequest()
    // request.open('POST', 'http://localhost:4000/api/post')
    // request.send(formDataRequest)

    // const postIsCreated = await response

    // if (postIsCreated) {
    return navigate('/dashboard')
    // }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = fetch('/api/posts/' + postid,
      postCreateOptions('PUT', { user, title, text, isPrivate })
    )

    const postIsUpdated = await response

    if (postIsUpdated) {
      return navigate('/dashboard')
    }
  }

  return (
    <section>
      <form action="" onSubmit={postid ? handleUpdateSubmit : handleCreateSubmit} encType='multipart/form-data'>
        <label htmlFor="title">Title: </label>
        <input type="text" name='title' onChange={handleChange} placeholder='Post title ...' value={formData.title} />
        <br />
        <label htmlFor="text">Post: </label>
        <textarea type="text" name='text' onChange={handleChange} placeholder='Post body ...' value={formData.text} />
        <br />
        <label htmlFor="image"></label>
        <input type="file" name='image' onChange={handleChange}/>
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
