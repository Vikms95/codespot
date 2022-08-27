/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledPostListContainer = styled.section`
  gap: 5em;
  margin: 2em 0;
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));

  &:first-child{
    margin: 500;
    background-color: red;
    grid-column:1 / 3;
  }
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
