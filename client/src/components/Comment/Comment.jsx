/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.article`
	display: flex;
	flex-direction: column;
	align-content: stretch;
	padding: 1.5em;
	width: 100%;
	border: 2px solid;
	border-image: linear-gradient(
			90deg,
			rgba(83, 65, 95, 0.9),
			rgba(60, 74, 83, 0)
		)
		1;
	border-left: none;
	border-top: none;
	border-right: none;
`;

const Username = styled.div``;
const Text = styled.p``;

function Comment(props) {
	return (
		<StyledComment>
			<Username>{props.user.username}</Username>
			<Text>{props.text}</Text>
			{props.timestamp}
		</StyledComment>
	);
}

export default Comment;
