/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { FaChevronDown, FaReply, FaPen, FaTrash } from 'react-icons/fa';

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
	gap: 25px;
	color: #6649b8;
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

function Comment(props) {
	const { id, text, user, timestamp, getReplies } = props;
	const childComments = getReplies(id);
	const [areChildrenHidden, setAreChildrenHidden] = useState(false);

	return (
		<>
			<StyledComment>
				<Username>{user.username}</Username>
				<Text>{text}</Text>

				<IconsContainer>
					<FaReply />
					<FaPen />
					<FaTrash />
				</IconsContainer>

				{childComments?.length > 0 && (
					<>
						<ChildrenCommentsLayout areChildrenHidden={areChildrenHidden}>
							<CollapseButton
								aria-label='Hide Replies'
								onClick={() => setAreChildrenHidden(true)}
							/>
							<CommentsLayout
								comments={childComments}
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
