/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { LazyComment as Comment } from '../components/Comment';

const StyledCommentsLayout = styled.section`
	display: grid;
	grid-auto-flow: row;
	row-gap: 3em;
	background-color: white;
	width: 80%;
	align-self: flex-start;
`;

export function CommentsLayout(props) {
	console.log('commentslayout is rendered');
	const { comments, getChildComments, handleCommentSubmit } = props;
	return (
		<StyledCommentsLayout>
			{comments?.map(comment => {
				return (
					<Comment
						key={comment._id}
						text={comment.text}
						commentid={comment._id}
						commentUser={comment.user}
						timestamp={comment.timestamp}
						getChildComments={getChildComments}
						handleCommentSubmit={handleCommentSubmit}
						isDeletedWithChildren={comment.isDeletedWithChildren}
					/>
				);
			})}
		</StyledCommentsLayout>
	);
}
