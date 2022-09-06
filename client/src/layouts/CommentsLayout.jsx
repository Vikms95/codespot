/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Comment from '../components/Comment/Comment';

const StyledCommentsLayout = styled.section`
	display: grid;
	grid-auto-flow: row;
	row-gap: 4em;
	background-color: white;
	width: 80%;
`;

export function CommentsLayout(props) {
	const { comments, getChildComments, setComments, handleCommentSubmit } =
		props;

	return (
		<>
			<StyledCommentsLayout>
				{comments?.length > 0 &&
					comments.map(comment => {
						return (
							<Comment
								key={comment._id}
								id={comment._id}
								text={comment.text}
								commentUser={comment.user}
								timestamp={comment.timestamp}
								getChildComments={getChildComments}
								setComments={setComments}
								isDeletedWithChildren={comment.isDeletedWithChildren}
								handleCommentSubmit={handleCommentSubmit}
							></Comment>
						);
					})}
			</StyledCommentsLayout>
		</>
	);
}
