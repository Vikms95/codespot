/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { deleteComment } from '../../services/deleteComment';
import { flagComment } from '../../services/flagComment';
import { findByID } from '../../utils/findbyID';
import { useCommentsContext } from '../../context/CommentsContext';
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
	const commentsContext = useCommentsContext().value;
	const childComments = getChildComments(id);

	const [isReplying, setIsReplying] = useState(false);

	const handleDelete = e => {
		e.preventDefault();

		if (childComments) {
			softDeleteComment();
		} else {
			hardDeleteComment(id);
		}
	};

	const softDeleteComment = () => {
		const comment = findByID(commentsContext, id);

		flagComment(comment);

		setComments(prevComments =>
			prevComments.map(item =>
				item._id === comment._id
					? { ...item, isDeletedWithChildren: true, text: '(deleted)' }
					: { ...item }
			)
		);
	};

	const hardDeleteComment = id => {
		const comment = findByID(commentsContext, id);

		deleteComment(id);

		setComments(prevComments =>
			prevComments.filter(comment => comment._id !== id)
		);

		checkForDeletedParentComent(commentsContext, comment);
	};

	const checkForDeletedParentComent = (commentsContext, comment) => {
		if (comment.parent) {
			const parentid = comment.parent;

			const parentComment = findByID(commentsContext, parentid);
			const parentComments = getChildComments(parentid);

			if (isDeletedWithoutChildren(parentComments, parentComment)) {
				hardDeleteComment(parentid);
			}
		}
	};

	const handleCommentReply = (e, setFormData, text, userid, parentid) => {
		setIsReplying(false);
		handleCommentSubmit(e, setFormData, text, userid, parentid);
	};

	const isDeletedWithoutChildren = (children, comment) =>
		children.length === 1 && comment.isDeletedWithChildren;

	return (
		<StyledComment>
			<CommentBody
				id={id}
				text={text}
				isReplying={isReplying}
				commentUser={commentUser}
				loggedInUserID={loggedInUserID}
				isDeletedWithChildren={isDeletedWithChildren}
				setIsReplying={setIsReplying}
				handleDelete={handleDelete}
				handleCommentReply={handleCommentReply}
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
