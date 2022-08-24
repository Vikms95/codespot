/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledPostListContainer = styled.section`
  gap: 5em;
  margin: 3em;
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(max(20em, 150px), 1fr));
`
const PostListTitle = styled.h2`
  font-size:1.5em ;
  margin-left: 2em;
`

function PostListContainer (props) {
  const { children, title } = props
  return (
    <>
      <PostListTitle>
        {title}
      </PostListTitle>

      <StyledPostListContainer>
        {children}
      </StyledPostListContainer>
    </>
  )
}

export default PostListContainer
