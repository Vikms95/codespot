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
	const { rootComments, getReplies } = props;
	return (
		<>
			<CommentsTitle>Comments</CommentsTitle>
			<StyledCommentsLayout>
				{rootComments?.map(comment => {
					getReplies(comment._id);
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
		</>
	);
}
