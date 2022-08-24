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
  max-height: 35em;
  text-overflow: ellipsis;
`

const PostImageContainer = styled.article`
  object-fit: cover;
  height: 100%;
  `
const PostImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 18em;
`
const StyledBookImage = styled(FaBookOpen)`
  display: none;
  position: absolute;
  color: white;
  font-size: 3em;
  top: 40%;
  left: 45%;
  z-index: 1;
`

const BookText = styled.span`
  display: none;
  position: absolute;
  color: white;
  font-size: 1em;
  top: 60%;
  left: 38%;
  z-index: 1;
`

const PostLink = styled(Link)`
  display: flex;
  position: relative;
  &:hover ${PostImage} {
    filter: brightness(.8);
    transform: scale(1.005, 1.005);
    transition: transform .5s;
  }
  &:hover ${StyledBookImage} {
    display: block;
  }
  &:hover ${BookText} {
    display: block;
  }
`

const PostContentContainer = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  padding: 1.5em;
  height: 100% ;
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
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* margin-bottom: 1rem; */
  padding: 0;
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
  useEffect(() => {
    if (image) {
      fetch('/images/' + image)
        .then(res => setImageSrc(res))
    }
  }, [])

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
          <StyledBookImage>
          </StyledBookImage>
          <BookText>Read this article</BookText>
          <PostImage src={imageSrc?.url || defaultPostImage} alt="default-post"/>
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
