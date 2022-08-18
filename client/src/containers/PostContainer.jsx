/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledPostContainer = styled.article`
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 4px 4px 10px -2px gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

function PostContainer ({ children }) {
  return (
    <StyledPostContainer>
      {children}
    </StyledPostContainer>
  )
}

export default PostContainer
