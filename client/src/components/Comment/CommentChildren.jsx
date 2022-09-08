/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ChildrenCommentsLayout } from '../../layouts/ChildrenCommentsLayout';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { FaChevronDown } from 'react-icons/fa';
import { CollapseButton, ExpandButton } from './_styles';

export function CommentChildren(props) {
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
