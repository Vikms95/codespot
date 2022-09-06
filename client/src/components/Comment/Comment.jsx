/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { CommentForm } from './CommentForm';
import { FaChevronDown, FaReply, FaPen, FaTrash } from 'react-icons/fa';
import { deleteComment } from '../../services/deleteComment';
import { flagComment } from '../../services/flagComment';
import { findByID } from '../../utils/findbyID';
import { useCommentsContext } from '../../context/CommentsContext';
import AuthContext from '../../context/AuthContext';

const StyledComment = styled.article`
	display: flex;
	flex-direction: column;
	line-height: 22px;
	padding-left: 1.5em;
	width: 100%;
`;

const Username = styled.div`
	color: #6649b8;
`;
const Text = styled.p``;

const CollapseButton = styled.button`
	border: none;
	border-right: solid 5px white;
	border-left: solid 5px white;
	background-color: #6649b8;
	padding: 1.2px;

	&:hover {
		background-color: #a899d4;
	}
`;

const ExpandButton = styled.button`
	display: flex;
	gap: 5px;
	border: none;
	background-color: transparent;
	display: ${props => (props.areChildrenHidden ? 'flex' : 'none')};
`;

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

function Comment(props) {
	const {
		id,
		text,
		commentUser,
		timestamp,
		isDeletedWithChildren,
		getChildComments,
		setComments,
		handleCommentSubmit,
	} = props;

	const { user: loggedInUserID } = useContext(AuthContext);
	const commentsContext = useCommentsContext().value;
	const childComments = getChildComments(id);

	const [isReplying, setIsReplying] = useState(false);
	const [areChildrenHidden, setAreChildrenHidden] = useState(false);

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
			const parentComment = findByID(commentsContext, comment.parent);

			if (parentComment.isDeletedWithChildren) {
				hardDeleteComment(comment.parent);
			}
		}
	};

	return (
		<>
			<StyledComment>
				<Username>{commentUser?.username || '(deleted user)'}</Username>
				<Text>{text}</Text>

				{loggedInUserID && !isDeletedWithChildren && (
					<IconsContainer>
						<IconButton
							onClick={() => setIsReplying(prev => !prev)}
							isActive={isReplying}
							aria-label={isReplying ? 'Cancel reply' : 'Reply'}
						>
							<FaReply />
						</IconButton>

						{commentUser?._id === loggedInUserID && (
							<>
								<IconButton>
									<FaPen />
								</IconButton>
								<IconButton onClick={handleDelete}>
									<FaTrash />
								</IconButton>
							</>
						)}
					</IconsContainer>
				)}
				<CommentBorder />

				{isReplying && (
					<CommentForm
						autoFocus
						parentid={id}
						handleCommentSubmit={handleCommentSubmit}
					/>
				)}

				{childComments?.length > 0 && (
					<>
						<ChildrenCommentsLayout areChildrenHidden={areChildrenHidden}>
							<CollapseButton
								aria-label='Hide Replies'
								onClick={() => setAreChildrenHidden(true)}
							/>
							<CommentsLayout
								comments={childComments}
								setComments={setComments}
								getChildComments={getChildComments}
								handleCommentSubmit={handleCommentSubmit}
							></CommentsLayout>
						</ChildrenCommentsLayout>

						<ExpandButton
							areChildrenHidden={areChildrenHidden}
							onClick={() => setAreChildrenHidden(false)}
						>
							{'Show replies'}
							<FaChevronDown />
						</ExpandButton>
					</>
				)}
			</StyledComment>
		</>
	);
}

export default Comment;
