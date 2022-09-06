/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/AuthContext';
import CommentBody from './CommentBody';
import CommentChildren from './CommentChildren';

const StyledComment = styled.article`
	display: flex;
	flex-direction: column;
	line-height: 22px;
	padding-left: 1.5em;
	width: 100%;
`;

function Comment(props) {
	const {
		id,
		text,
		commentUser,
		timestamp,
		setComments,
		getChildComments,
		handleCommentSubmit,
		isDeletedWithChildren,
	} = props;

	const { user: loggedInUserID } = useContext(AuthContext);
	const childComments = getChildComments(id);

	return (
		<StyledComment>
			<CommentBody
				id={id}
				text={text}
				commentUser={commentUser}
				childComments={childComments}
				setComments={setComments}
				loggedInUserID={loggedInUserID}
				isDeletedWithChildren={isDeletedWithChildren}
				handleCommentSubmit={handleCommentSubmit}
				getChildComments={getChildComments}
			/>

			{childComments?.length > 0 && (
				<CommentChildren
					setComments={setComments}
					childComments={childComments}
					getChildComments={getChildComments}
					handleCommentSubmit={handleCommentSubmit}
				/>
			)}
		</StyledComment>
	);
}

export default Comment;
