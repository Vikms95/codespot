/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.article``;

function Comment(props) {
	return <StyledComment>{props.user.username}{props.text}</StyledComment>;
}

export default Comment;
