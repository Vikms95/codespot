/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledModalContainer = styled.div`
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1;
`

function ModalContainer (props) {
  const { isModalActive, children } = props

  return (
    <StyledModalContainer>
      {isModalActive && children }
    </StyledModalContainer>
  )
}

export default ModalContainer
