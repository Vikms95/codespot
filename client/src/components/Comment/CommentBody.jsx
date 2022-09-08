/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FaReply, FaPen, FaTrash } from 'react-icons/fa';
import { CommentForm } from '../Form/CommentForm';
import {
	flagComment,
	deleteComment,
	updateComment,
} from '../../services/comment';
import { findByID } from '../../utils/findbyID';
import { useCommentsContext } from '../../context/CommentsContext';
import { commentFields } from '../../data/formFields';

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

export function CommentBody(props) {
	const {
		text,
		commentid,
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
	const { postid } = useParams();

	const handleDelete = e => {
		e.preventDefault();

		if (childComments) {
			softDeleteComment();
		} else {
			hardDeleteComment(commentid);
		}
	};

	const softDeleteComment = () => {
		const comment = findByID(commentsContext, commentid);

		flagComment(comment);

		setComments(prevComments =>
			prevComments.map(item =>
				item._id === comment._id
					? { ...item, isDeletedWithChildren: true, text: '(deleted)' }
					: { ...item }
			)
		);
	};

	const hardDeleteComment = commentid => {
		const comment = findByID(commentsContext, commentid);

		deleteComment(commentid);

		setComments(prevComments =>
			prevComments.filter(comment => comment._id !== commentid)
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

	const handleCommentReply = (e, setFormData, text, userid, parentid) => {
		setIsFormActive(false);
		handleCommentSubmit(e, setFormData, text, userid, parentid);
	};

	const handleCommentUpdate = async (
		e,
		setFormData,
		text,
		userid,
		commentid
	) => {
		e.preventDefault();

		setIsFormActive(false);

		const comment = await updateComment(
			text,
			postid,
			userid,
			commentid,
			commentsContext,
			isDeletedWithChildren
		);

		setComments(prevComments =>
			prevComments.map(prevComment =>
				prevComment._id === commentid ? comment : prevComment
			)
		);

		setFormData(commentFields);
	};

	const wasSoftDeleted = (children, comment) =>
		children.length === 1 && comment.isDeletedWithChildren;

	return (
		<>
			<Username>{commentUser?.username || '(deleted user)'}</Username>
			<Text>{text}</Text>

			{loggedInUserID && !isDeletedWithChildren && (
				<IconsContainer>
					{loggedInUserID !== commentUser?._id && (
						<IconButton
							onClick={() => {
								setIsFormActive(true);
							}}
							isActive={isFormActive}
							aria-label={isFormActive ? 'Cancel reply' : 'Reply'}
						>
							<FaReply />
						</IconButton>
					)}

					{loggedInUserID === commentUser?._id && (
						<>
							<IconButton
								onClick={() => setIsFormActive(true)}
								isActive={isFormActive}
								aria-label={isFormActive ? 'Cancel edit' : 'Edit'}
							>
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
					initialValue={text}
					isCommentForm={true}
					autoFocus={true}
					commentid={commentid}
					type={loggedInUserID !== commentUser?._id ? 'reply' : 'edit'}
					setIsFormActive={setIsFormActive}
					handleCommentSubmit={handleCommentReply}
					handleCommentUpdate={handleCommentUpdate}
				/>
			)}
		</>
	);
}
