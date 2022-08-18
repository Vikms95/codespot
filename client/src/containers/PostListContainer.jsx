/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledPostListContainer = styled.section`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
`

function PostListContainer ({ children }) {
  return (
    <StyledPostListContainer>
      {children}
    </StyledPostListContainer>
  )
}

export default PostListContainer
