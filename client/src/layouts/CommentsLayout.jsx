/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Comment from '../components/Comment/Comment';

const StyledCommentsLayout = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-auto-rows: 1fr;
	row-gap: 3em;
	background-color: white;
	width: 60%;
`;

const CommentsTitle = styled.h1``;

export function CommentsLayout(props) {
	return (
		<StyledCommentsLayout>
			<CommentsTitle>Comments</CommentsTitle>

			{props.comments?.map(comment => {
				return (
					<Comment
						key={comment._id}
						text={comment.text}
						user={comment.user}
						timestamp={comment.timestamp}
					></Comment>
				);
			})}
		</StyledCommentsLayout>
	);
}
