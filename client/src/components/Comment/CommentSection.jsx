/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Comment from './Comment'

const StyledCommentSection = styled.section`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
`;

export function CommentSection(props) {
	return (
    <StyledCommentSection>
      {props.comments?.map(comment => {
        return  <Comment 
                  key={comment.text}
                  text={comment.text}
                  user={comment.user}
                ></Comment>
      })}
    </StyledCommentSection>
	);
}

