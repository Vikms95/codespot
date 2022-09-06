/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaReply, FaPen, FaTrash } from 'react-icons/fa';
import { CommentForm } from './CommentForm';
import { flagComment } from '../../services/flagComment';
import { findByID } from '../../utils/findbyID';
import { deleteComment } from '../../services/deleteComment';
import { useCommentsContext } from '../../context/CommentsContext';

const Username = styled.div`
	color: #6649b8;
`;

const Text = styled.p``;

const IconsContainer = styled.div`
	display: flex;
	gap: 10px;
	padding-bottom: 1em;
`;

const IconButton = styled.button`
	border: none;
	background-color: transparent;
	color: #6649b8;
`;

const StyledFaTrash = styled(FaTrash)`
	color: red;
`;

const CommentBorder = styled.div`
	margin-bottom: 2em;
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

function CommentBody(props) {
	const {
		id,
		text,
		commentUser,
		childComments,
		setComments,
		loggedInUserID,
		isDeletedWithChildren,
		handleCommentSubmit,
		getChildComments,
	} = props;

	const [isFormActive, setIsFormActive] = useState(false);
	const commentsContext = useCommentsContext().value;

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

			if (wasSoftDeleted(parentComments, parentComment)) {
				hardDeleteComment(parentid);
			}
		}
	};

	const wasSoftDeleted = (children, comment) =>
		children.length === 1 && comment.isDeletedWithChildren;

	const handleCommentReply = (e, setFormData, text, userid, parentid) => {
		setIsFormActive(false);
		handleCommentSubmit(e, setFormData, text, userid, parentid);
	};
	return (
		<>
			<Username>{commentUser?.username || '(deleted user)'}</Username>
			<Text>{text}</Text>

			{loggedInUserID && !isDeletedWithChildren && (
				<IconsContainer>
					<IconButton
						onClick={() => setIsFormActive(prev => !prev)}
						isActive={isFormActive}
						aria-label={isFormActive ? 'Cancel reply' : 'Reply'}
					>
						<FaReply />
					</IconButton>

					{commentUser?._id === loggedInUserID && (
						<>
							<IconButton>
								<FaPen />
							</IconButton>
							<IconButton onClick={handleDelete}>
								<StyledFaTrash />
							</IconButton>
						</>
					)}
				</IconsContainer>
			)}
			<CommentBorder />

			{isFormActive && (
				<CommentForm
					isCommentForm={true}
					autoFocus={true}
					parentid={id}
					setIsFormActive={setIsFormActive}
					handleCommentSubmit={handleCommentReply}
				/>
			)}
		</>
	);
}

export default CommentBody;
