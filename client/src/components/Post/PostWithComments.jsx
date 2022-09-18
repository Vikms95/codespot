/* eslint-disable react/prop-types */
import React from 'react';
import { Post } from './Post';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { useCommentsContext } from '../../context/CommentsContext';

export function PostWithComments(props) {
	const { handleCommentSubmit } = props;
	const { comments, setComments } = useCommentsContext();
	const { rootComments, getChildComments } = useDerivedComments(comments);

	return (
		<Post>
			<CommentsLayout
				comments={rootComments}
				setComments={setComments}
				getChildComments={getChildComments}
				handleCommentSubmit={handleCommentSubmit}
			/>
		</Post>
	);
}
