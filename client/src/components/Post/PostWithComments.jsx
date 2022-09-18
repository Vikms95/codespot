/* eslint-disable react/prop-types */
import React from 'react';
import { Post } from './Post';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { useCommentsContext } from '../../context/CommentsContext';

export function PostWithComments(props) {
	const { setPosts, handleCommentSubmit } = props;
	const { comments, setComments } = useCommentsContext().value;
	const { rootComments, getChildComments } = useDerivedComments(comments);

	return (
		<Post setPosts={setPosts}>
			<CommentsLayout
				comments={rootComments}
				setComments={setComments}
				getChildComments={getChildComments}
				handleCommentSubmit={handleCommentSubmit}
			/>
		</Post>
	);
}
