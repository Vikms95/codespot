/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import usePost from '../hooks/usePost'
import styled from 'styled-components'
import { useHtmlAsText } from '../hooks/useText'

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
  const { postid } = useParams()
  // const { posts } = useContext(PostsContext)
  const { posts } = props
  const post = usePost(postid, posts)
  const textRef = useRef(null)
  const [imageSrc, setImageSrc] = useState()

  useHtmlAsText(textRef, post.text)

  useEffect(() => {
    if (post) {
      fetch('/images/' + post.image)
        .then(res => setImageSrc(res || ''))
    }
  }, [posts, post])

  return (
    <StyledPost>
      <Title>{post.title}</Title>
      {imageSrc?.ok &&
        <Image src={imageSrc?.url} alt='post-portrait'></Image>
      }
      <Text ref={textRef}></Text>
    </StyledPost>
  )
}

export default Post
