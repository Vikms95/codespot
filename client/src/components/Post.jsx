/* eslint-disable react/prop-types */
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHtmlAsText } from '../hooks/useHtmlAsText'
import { useImage } from '../hooks/useImage'
import { usePost } from '../hooks/usePost'

const StyledPost = styled.section`
  margin: 5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  font-size: 4em;
`
const Image = styled.img`
  max-width: 100%;
  max-height: 100rem;
  align-self: center;
  margin-bottom: 3em;
`

const Text = styled.p`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  text-align:justify;
  max-width: 70%;
`

function Post (props) {
  const { posts } = props
  const { postid } = useParams()

  const post = usePost(postid, posts)
  const imageSrc = useImage(post.image, [post])
  const textRef = useHtmlAsText(post.text)

  return (
    <StyledPost>
      <Title>{post.title}</Title>

      {
        (imageSrc?.ok) &&
          <Image src={imageSrc?.url} alt='post-portrait'></Image>
      }

      <Text ref={textRef}></Text>
    </StyledPost>
  )
}

export default Post
