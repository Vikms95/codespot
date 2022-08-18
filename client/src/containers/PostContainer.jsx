/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledPostContainer = styled.article`
  display:flex;
`

function PostContainer ({ children }) {
  return (
    <StyledPostContainer>
      {children}
    </StyledPostContainer>
  )
}

export default PostContainer
