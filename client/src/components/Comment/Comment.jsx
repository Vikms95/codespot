/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { FaChevronDown, FaReply, FaPen, FaTrash } from 'react-icons/fa';
import { deleteComment } from '../../services/deleteComment';
import { flagComment } from '../../services/flagComment';
import AuthContext from '../../context/AuthContext';
import { findByID } from '../../utils/findbyID';

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

const IconButton = styled.button`
	border: none;
	background-color: transparent;
	color: #6649b8;
`;

function Comment(props) {
	const {
		id,
		text,
		user,
		timestamp,
		isDeletedWithChildren,
		getReplies,
		setComments,
		comments,
	} = props;
	const childComments = getReplies(id);
	const { user: loggedInUserID } = useContext(AuthContext);
	const [areChildrenHidden, setAreChildrenHidden] = useState(false);

	const softDeleteComment = comment => {
		flagComment(comment);

		setComments(prevComments =>
			prevComments.map(item =>
				item._id === comment._id
					? { ...item, isDeletedWithChildren: true, text: '(deleted)' }
					: { ...item }
			)
		);
	};

	const hardDeleteComment = (comment, id) => {
		deleteComment(id);

		setComments(prevComments =>
			prevComments.filter(comment => comment._id !== id)
		);
		console.log(comment);
		// comment.parent.isDeletedWithChildren === true
		if (comment.parent) {
			const parentComment = findByID(comments, comment.parent);
			console.log(parentComment);

			if (parentComment.isDeletedWithChildren) {
				hardDeleteComment(comments, comment.parent);
			}
		}
	};

	const handleDelete = e => {
		e.preventDefault();

		const comment = findByID(comments, id);

		if (childComments) {
			softDeleteComment(comment);
		} else {
			hardDeleteComment(comment, id);
		}
	};

	return (
		<>
			<StyledComment>
				<Username>{user?.username || '(deleted user)'}</Username>
				<Text>{text}</Text>

				{loggedInUserID && !isDeletedWithChildren && (
					<IconsContainer>
						<IconButton>
							<FaReply />
						</IconButton>
						{user?._id === loggedInUserID && (
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
								getReplies={getReplies}
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
