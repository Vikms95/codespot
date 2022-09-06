/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { FaReply, FaPen, FaTrash } from 'react-icons/fa';
import { CommentForm } from './CommentForm';

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
		isReplying,
		commentUser,
		loggedInUserID,
		isDeletedWithChildren,
		setIsReplying,
		handleDelete,
		handleCommentReply,
	} = props;
  
	return (
		<>
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
								<StyledFaTrash />
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
					handleCommentSubmit={handleCommentReply}
				/>
			)}
		</>
	);
}

export default CommentBody;
