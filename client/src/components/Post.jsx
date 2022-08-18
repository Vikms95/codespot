/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import defaultPostImage from '../assets/default-image.jpg'
import styled from 'styled-components'

const PostImageContainer = styled.article`
  object-fit: fill;
  `

const PostContentContainer = styled.article`
  padding: 2em 1em;
`
const PostUsername = styled.h3`
  display: flex;
  font-weight: 900;
  align-self: flex-end;
  `

const PostButton = styled.button`
  color: white;
  background-color: #972897;
  font-size: 1em;
  border-radius: 8px ;
  border: none;
  `

const PostImage = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
        <PostUsername>{user.username}</PostUsername>
        <div>{title}</div>
        <div>{text}</div>

        {
          (user._id === currentUserId) &&
          <>
            <PostButton onClick={handleUpdate}>Update</PostButton>
            <PostButton onClick={revealDeleteModal}>Delete</PostButton>
          </>
        }
      </PostContentContainer>
    </>
  )
}

export default Post
