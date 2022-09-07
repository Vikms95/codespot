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
`;

export function CommentsLayout(props) {
	const { comments, getChildComments, setComments, handleCommentSubmit } =
		props;

	return (
		<>
			<StyledCommentsLayout>
				{comments.map(comment => {
					return (
						<Comment
							key={comment._id}
							text={comment.text}
							commentid={comment._id}
							commentUser={comment.user}
							timestamp={comment.timestamp}
							setComments={setComments}
							getChildComments={getChildComments}
							handleCommentSubmit={handleCommentSubmit}
							isDeletedWithChildren={comment.isDeletedWithChildren}
						></Comment>
					);
				})}
			</StyledCommentsLayout>
		</>
	);
}
