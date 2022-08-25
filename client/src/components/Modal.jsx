/* eslint-disable react/prop-types */
import React from 'react'
import ModalWrapper from '../containers/ModalWrapper'
import { deleteOptions } from '../services/requestParams'
import styled from 'styled-components'
import { Button } from '../style/Button'

const StyledModal = styled.section`
  background-color: white;
  top:50%;
  left:50%;
  position: absolute;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
  padding: 3em;
  border-radius: 5px;
  box-shadow: 2px 2px 10px 0px;
`
const ButtonContainer = styled.div`
  display: flex;
  gap: 2em;
`

function Modal (props) {
  const
    {
      setPosts,
      lastClickedPostId,
      setIsModalActive,
      isModalActive
    } = props

  const handleDelete = () => {
    fetch('/api/posts/' + lastClickedPostId, deleteOptions)

    setPosts(prevPosts => (
      prevPosts.filter(post => post._id !== lastClickedPostId)
    ))

    handleCancel()
  }

  const handleCancel = (e) => {
    setIsModalActive(false)
  }

  return (
      <ModalWrapper
        isModalActive={isModalActive}
        handleCancel={handleCancel}
      >

        <StyledModal onClick={(e) => e.stopPropagation()}>

          <p> Are you sure you want to delete this post? </p>
          <ButtonContainer>
            <Button onClick={handleCancel}> Cancel</Button>
            <Button onClick={handleDelete}> Delete</Button>
          </ButtonContainer>

        </StyledModal>

      </ModalWrapper>
  )
}

export default Modal
