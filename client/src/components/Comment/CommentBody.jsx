/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentForm } from '../Form/CommentForm';
import { findByID } from '../../utils/findbyID';
import { useCommentsContext } from '../../context/CommentsContext';
import { commentFields } from '../../data/formFields';
import { useAuthContext } from '../../context/AuthContext';

import {
	flagComment,
	deleteComment,
	updateComment,
} from '../../services/comment';

import { IconsContainer, CommentBorder, Text } from './_styles';
import { addPropsToChildren } from '../../utils/addPropsToChildren';

export function CommentBody(props) {
	const {
		text,
		commentid,
		commentUserId,
		childComments,
		isDeletedWithChildren,
		handleCommentSubmit,
		getChildComments,
		children,
	} = props;

	const { postid } = useParams();
	const { comments, setComments } = useCommentsContext();
	const { user: loggedUserID } = useAuthContext();
	const [isFormActive, setIsFormActive] = useState(false);

	const handleDelete = e => {
		e.preventDefault();

		if (childComments) {
			softDeleteComment();
		} else {
			hardDeleteComment(commentid);
		}
	};

	const softDeleteComment = async () => {
		const comment = findByID(comments, commentid);

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
		const comment = findByID(comments, commentid);

		const data = await deleteComment(commentid);
		if (!data) return;

		setComments(prevComments =>
			prevComments.filter(comment => comment._id !== commentid)
		);

		checkForDeletedParentComent(comments, comment);
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
			comments,
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

	const isLoggedUserCommentDeleted = () =>
		loggedUserID && !isDeletedWithChildren;

	const isLoggedUserComment = () => loggedUserID === commentUserId;

	return (
		<>
			{React.Children.toArray(children[0])}

			<Text>{text}</Text>

			<IconsContainer>
				{isLoggedUserCommentDeleted() &&
					React.Children.toArray(
						isLoggedUserComment()
							? addPropsToChildren(children[1], {
									handleDelete,
									isFormActive,
									setIsFormActive,
							  })
							: addPropsToChildren(children[2], {
									isFormActive,
									setIsFormActive,
							  })
					)}
			</IconsContainer>
			<CommentBorder />

			{isFormActive && (
				<CommentForm
					initialValue={text}
					isCommentForm={true}
					autoFocus={true}
					commentid={commentid}
					type={loggedUserID !== commentUserId ? 'reply' : 'edit'}
					setIsFormActive={setIsFormActive}
					handleCommentSubmit={handleCommentReply}
					handleCommentUpdate={handleCommentUpdate}
				/>
			)}
		</>
	);
}
