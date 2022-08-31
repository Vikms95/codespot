/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';

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
const Text = styled.p`
	padding-bottom: 1em;
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
	const { id, text, user, timestamp, getReplies } = props;
	const childComments = getReplies(id);
	const areChildrenHidden = false;

	console.log(childComments);
	return (
		<StyledComment>
			<Username>{user.username}</Username>
			<Text>{text}</Text>

			{childComments?.length > 0 && (
				<>
					<ChildrenCommentsLayout areChildrenHidden={areChildrenHidden}>
						<CommentsLayout
							comments={childComments}
							getReplies={getReplies}
						></CommentsLayout>
					</ChildrenCommentsLayout>
				</>
			)}
		</StyledComment>
	);
}

export default Comment;
