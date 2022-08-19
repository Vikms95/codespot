/* eslint-disable react/prop-types */
import React from 'react'
import ModalWrapper from '../wrappers/ModalWrapper'
import { deleteOptions } from '../services/requestParams'
import styled from 'styled-components'

const StyledModal = styled.section`
  background-color: red;
  border:1px solid red; 
  top:50%;
  left:50%;
  z-index:2;
  position: fixed;
  transform: translate(-50%,-50%);
`

function Modal (props) {
  const { lastClickedPostId, setIsModalActive, setPosts, isModalActive } = props

  const handleDelete = () => {
    fetch('/api/posts/' + lastClickedPostId, deleteOptions)

    setPosts(prevPosts => (
      prevPosts.filter(post => post._id !== lastClickedPostId)
    ))

    handleCancel()
  }

  const handleCancel = () => {
    setIsModalActive(false)
  }

  return (
      <ModalWrapper
        isModalActive={isModalActive}
        handleCancel={handleCancel}
      >
        <StyledModal>
          <p> Are you sure you want to delete this post? </p>
          <button onClick={handleCancel}> Cancel</button>
          <button onClick={handleDelete}> Delete</button>
        </StyledModal>
      </ModalWrapper>
  )
}

export default Modal
