/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postCreateOptions } from '../services/requestParams'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import styled from 'styled-components'
import { Editor } from '@tinymce/tinymce-react'
import { parseEditorData } from '../services/parseEditorData'
import { usePostToUpdate } from '../hooks/usePostToUpdate'
import { Label } from '../styled/Label'
import { Button } from '../styled/Button'

const PostFormContainer = styled.section`
  margin:5em;  
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledPostForm = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

const TitleInput = styled.input`
  padding:.5em;
  width: 20em;
`

const FormButton = styled(Button)`
  width: 10em;
  margin-left: 13em;
`

function PostForm (props) {
  const { posts } = props
  const { postid } = useParams()
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const editorRef = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPrivate: false
    // image: ''
  })

  usePostToUpdate(postid, posts, setFormData)

  const { title, text, isPrivate, image } = formData

  const handleChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }))
  }

  const handlePrivacyChange = (e) => {
    setFormData(prevFormData => ({ ...prevFormData, isPrivate: !prevFormData.isPrivate }))
  }

  const handleImageChange = (e) => {
    setFormData(prevFormData => ({ ...prevFormData, image: e.target.files[0] }))
  }

  const handleEditorChange = (content, editor) => {
    const editorContent = editorRef.current.getContent()
    setFormData(prevFormData => ({ ...prevFormData, text: editorContent }))
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()

    const formDataRequest = new FormData()

    // formDataRequest.append('image', image)
    formDataRequest.append('title', title)
    formDataRequest.append('text', text)
    formDataRequest.append('isPrivate', isPrivate)
    formDataRequest.append('user', user)

    axios.post('http://localhost:4000/api/post', formDataRequest, {
    }).then(res => console.log(res))

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
    <PostFormContainer>
      <StyledPostForm onSubmit={postid ? handleUpdateSubmit : handleCreateSubmit} encType='multipart/form-data'>

        <Label htmlFor="title">Title </Label>
        <TitleInput type="text" name='title' onChange={handleChange} placeholder='Post title ...' value={title} maxLength='40' />
        <br />

        <Label htmlFor="text">Post </Label>
        <Editor
          onInit={(_e, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            width: 700,
            menubar: false
          }}
          apiKey='k1kgs8qmzd0isvug3s4btubgrps7yutyhiy7jbsi038go8sq'
          name='html'
          value={formData.text}
          onEditorChange={(content, editor) => {
            handleEditorChange(parseEditorData(content, editor))
          }}
        />

        <br />
        <Label htmlFor="image"></Label>
        <input type="file" name='image' onChange={handleImageChange}/>
        <br />

        <Label htmlFor="privacy">Should we keep this post private?</Label>
        <input type="checkbox" name='privacy' onChange={handlePrivacyChange} checked={isPrivate} />
        <br />

        <FormButton type='submit'>{postid ? 'Update post' : 'Submit post'}</FormButton>
      </StyledPostForm>
    </PostFormContainer>
  )
}

export default PostForm
