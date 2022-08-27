import React from 'react'
import styled from 'styled-components'

const StyledCommentForm = styled.form`

`

function CommentForm () {
  return (
    <StyledCommentForm>
      <input type="text" />
      <button type='submit'></button>
    </StyledCommentForm>
  )
}

export default CommentForm
