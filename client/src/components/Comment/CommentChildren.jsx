/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { FaChevronDown } from 'react-icons/fa';

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

function CommentChildren(props) {
	const { childComments, setComments, getChildComments, handleCommentSubmit } =
		props;

	const [areChildrenHidden, setAreChildrenHidden] = useState(false);

	return (
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
	);
}

export default CommentChildren;
