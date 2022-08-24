/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import defaultPostImage from '../assets/default-image.jpg'
import styled from 'styled-components'
import { Button } from '../styled/Button'

const StyledPost = styled.section`
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  box-shadow: 4px 4px 10px -2px gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

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
const PostTopRowContainer = styled.article`
  display: flex;
  justify-content: space-between;
`

const PostTopRow = styled.h3`
  margin: 0 0 .8em 0;
  font-size: smaller ;
  color: #8d8d8d;
  display: flex;
  align-self: flex-end;
`

const PostTitle = styled.h2`
  margin: 0;
  font-size: larger;
`

const PostDesc = styled.div`
  & > p{
    text-overflow: ellipsis ;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;

  }
`

const PostButtonContainer = styled.article`
  display: flex;
  justify-content: space-evenly;
  
`

function Post (props) {
  const {
    id,
    user,
    title,
    text,
    image,
    timestamp,
    setIsModalActive,
    setLastClickedPostId
  } = props
  const navigate = useNavigate()

  const [imageSrc, setImageSrc] = useState()
  const { user: currentUserId } = useContext(AuthContext)
  const descRef = useRef(null)

  useEffect(() => {
    if (descRef.current) {
      descRef.current.innerHTML = text
    }
  })

  // Refactor into hook
  // TRYING IT OUT ON DASHBOARD
  // useEffect(() => {
  //   // console.log(image)
  //   // const imageURL = image
  //   fetch(image)
  //     .then(res => console.log(res))
  //     .then()
  // })

  const handleUpdate = () => {
    return navigate('/update/' + id)
  }

  const revealDeleteModal = () => {
    setIsModalActive(true)
    setLastClickedPostId(id)
  }

  return (
    <StyledPost>

      <PostImageContainer>
        <PostImage src={defaultPostImage} alt="default-post"/>
      </PostImageContainer>

      <PostContentContainer>
        <PostTopRowContainer>
          <PostTopRow>by {user.username}</PostTopRow>
          <PostTopRow>{timestamp}</PostTopRow>
        </PostTopRowContainer>

        <PostTitle>{title}</PostTitle>
        <PostDesc ref={descRef}></PostDesc>
        {
          (user._id === currentUserId) &&

          <PostButtonContainer>
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={revealDeleteModal}>Delete</Button>
          </PostButtonContainer>

        }
      </PostContentContainer>

    </StyledPost>
  )
}

export default Post
