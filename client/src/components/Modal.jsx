/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%)
`

function Modal (props) {
  const { isModalActive } = props

  return (
    (isModalActive &&
      <ModalContainer>
        <div> Are you sure you want to delete this post? </div>
        <button > Cancel</button>
        <button > Delete</button>
      </ModalContainer>
    )
  )
}

export default Modal
