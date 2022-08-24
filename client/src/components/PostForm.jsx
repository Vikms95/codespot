/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef } from 'react'
import { postCreateOptions } from '../services/requestParams'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import styled from 'styled-components'
import { Editor } from '@tinymce/tinymce-react'
import { parseEditorData } from '../services/parseEditorData'
import { usePostToUpdate } from '../hooks/usePostToUpdate'
import { Label } from '../styled/Label'
import { Button } from '../styled/Button'
import { getCurrentDate } from '../services/getCurrentDate'
import { createFormData } from '../services/createFormData'

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

const CheckBoxContainer = styled.div`
  position: relative;
`

const CheckBoxLabel = styled.label`
  position:absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  position:absolute;
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #531753;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`

const FormButton = styled(Button)`
  width: 10em;
  margin-left: 13em;
`

function PostForm (props) {
  const { posts } = props
  const { postid } = useParams()
  const { user } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    isPublic: false,
    // image: ''
    timestamp: ''
  })

  const navigate = useNavigate()
  const editorRef = useRef(null)
  usePostToUpdate(postid, posts, setFormData)

  const {
    title,
    text,
    isPublic
    // image
  } = formData

  const handleChange = (e) => {
    setFormData((prevFormData) => (
      { ...prevFormData, [e.target.name]: e.target.value }
    ))
  }

  const handlePrivacyChange = (e) => {
    setFormData(prevFormData => (
      { ...prevFormData, isPublic: !prevFormData.isPublic }
    ))
  }

  const handleImageChange = (e) => {
    setFormData(prevFormData => (
      { ...prevFormData, image: e.target.files[0] }
    ))
  }

  const handleEditorChange = (content, editor) => {
    const editorContent = editorRef.current.getContent()
    setFormData(prevFormData => (
      { ...prevFormData, text: editorContent }
    ))
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()

    const timestamp = getCurrentDate()
    const formDataRequest = createFormData(
      {
        title,
        text,
        isPublic,
        user,
        // image,
        formerTimestamp: formData.timestamp,
        timestamp
      }
    )

    axios.post('http://localhost:4000/api/post', formDataRequest, {
    }).then(res => console.log(res))

    // if (postIsCreated) {
    return navigate('/dashboard')
    // }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const response = fetch('/api/posts/' + postid,
      postCreateOptions('PUT', { user, title, text, isPublic })
    )

    const postIsUpdated = await response

    if (postIsUpdated) {
      return navigate('/dashboard')
    }
  }

  return (
    <PostFormContainer>
      <StyledPostForm
        onSubmit={(postid)
          ? handleUpdateSubmit
          : handleCreateSubmit}
        encType='multipart/form-data'
      >

        <Label htmlFor="title">Title </Label>
        <TitleInput
          type="text"
          name='title'
          onChange={handleChange}
          placeholder='Post title ...'
          value={title}
          maxLength='40'
        />
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
        <input
          type="file"
          name='image'
          onChange={handleImageChange}
        />
        <br />

          <div >Publish this post</div>
          <CheckBoxContainer>
            <CheckBox
              type="checkbox"
              name='privacy'
              onChange={handlePrivacyChange}
              checked={isPublic}
            />
            <CheckBoxLabel htmlFor="privacy"></CheckBoxLabel>
          </CheckBoxContainer>
        <br />

        <FormButton
          type='submit'>{(postid)
            ? 'Update post'
            : 'Submit post'}
        </FormButton>
      </StyledPostForm>
    </PostFormContainer>
  )
}

export default PostForm
