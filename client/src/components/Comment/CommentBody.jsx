/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaReply, FaPen } from 'react-icons/fa';
import { CommentForm } from '../Form/CommentForm';
import { findByID } from '../../utils/findbyID';
import { useCommentsContext } from '../../context/CommentsContext';
import { commentFields } from '../../data/formFields';

import {
	flagComment,
	deleteComment,
	updateComment,
} from '../../services/comment';

import {
	Username,
	Text,
	IconsContainer,
	IconButton,
	StyledFaTrash,
	CommentBorder,
	CommentDate,
	CommentTopRow,
} from './_styles';
import { getRelativeCurrentDate } from '../../utils/getRelativeCurrentDate';

export function CommentBody(props) {
	const {
		text,
		commentid,
		commentUser,
		timestamp,
		childComments,
		setComments,
		loggedInUserID,
		isDeletedWithChildren,
		handleCommentSubmit,
		getChildComments,
	} = props;

	const { postid } = useParams();
	const [isFormActive, setIsFormActive] = useState(false);
	const commentsContext = useCommentsContext().value;

	const handleDelete = e => {
		e.preventDefault();

		if (childComments) {
			softDeleteComment();
		} else {
			hardDeleteComment(commentid);
		}
	};

	const softDeleteComment = async () => {
		const comment = findByID(commentsContext, commentid);

		const data = await flagComment(comment);
		if (!data) return;

		setComments(prevComments =>
			prevComments.map(item =>
				item._id === comment._id
					? { ...item, isDeletedWithChildren: true, text: '(deleted)' }
					: { ...item }
			)
		);
	};

	const hardDeleteComment = async commentid => {
		const comment = findByID(commentsContext, commentid);

		const data = await deleteComment(commentid);
		if (!data) return;

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
		if (!comment) return;

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
			<CommentTopRow>
				<Username>{commentUser?.username || '(deleted user)'}</Username>
				<CommentDate>{getRelativeCurrentDate(timestamp)}</CommentDate>
			</CommentTopRow>
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
