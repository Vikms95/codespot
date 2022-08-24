/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import styled from 'styled-components'
import { Button } from '../styled/Button'
import { useText } from '../hooks/useText'
import defaultPostImage from '../assets/default-image.jpg'
import { FaBookOpen } from 'react-icons/fa'

const StyledPostPreview = styled.section`
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
const StyledBookImage = styled(FaBookOpen)`
  display: none;
  position: absolute;
  color: white;
  font-size: 3em;
  top: 100px;
  left: 300px;
  z-index: 1;
`
const PostLink = styled(Link)`
  display: flex;
  position: relative;
  &:hover ${PostImage} {
    filter: brightness(.8);
  }
  &:hover ${StyledBookImage} {
    display: block;
  }
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

function PostPreview (props) {
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

  const [imageSrc, setImageSrc] = useState()
  const { user: currentUserId } = useContext(AuthContext)
  const descRef = useRef(null)

  const navigate = useNavigate()

  useText(descRef, text)

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
    <StyledPostPreview>

      <PostImageContainer>
        <PostLink to={`/${id}`}>
          <StyledBookImage> Open article </StyledBookImage>
          <PostImage src={defaultPostImage} alt="default-post"/>
        </PostLink>
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

    </StyledPostPreview>
  )
}

export default PostPreview
