/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import defaultPostImage from '../assets/default-image.jpg'
import styled from 'styled-components'
import Button from '../styled/Button'

const PostImageContainer = styled.article`
  object-fit: fill;
  `

const PostContentContainer = styled.article`
  padding: 1.5em;
  height: 100%;
`
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const PostUsername = styled.h3`
  margin: 0 0 .8em 0;
  font-size: smaller ;
  color: #a0a0a0;
  display: flex;
  align-self: flex-end;
  `
const PostTitle = styled.h2`
  margin: 0;
`

const PostDesc = styled.p`
  
`

const PostButtonContainer = styled.article`
  display: flex;
  justify-content: space-evenly;
`

function Post (props) {
  const navigate = useNavigate()
  const { id, user, title, text, setIsModalActive, setLastClickedPostId } = props

  const { user: currentUserId } = useContext(AuthContext)

  const handleUpdate = async () => {
    return navigate('/update/' + id)
  }

  const revealDeleteModal = () => {
    setIsModalActive(true)
    setLastClickedPostId(id)
  }

  return (
    <>
      <PostImageContainer>
        <PostImage src={defaultPostImage} alt="default-post"/>
      </PostImageContainer>

      <PostContentContainer>
        <PostUsername>by {user.username}</PostUsername>
        <PostTitle>{title}</PostTitle>
        <PostDesc>{text}</PostDesc>
        {
          (user._id === currentUserId) &&
          <PostButtonContainer>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={revealDeleteModal}>Delete</Button>
          </PostButtonContainer>
        }
      </PostContentContainer>
    </>
  )
}

export default Post
