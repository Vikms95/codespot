/* eslint-disable react/prop-types */
import React from 'react';
import { PostBody } from './PostBody';
import { CommentForm } from '../Form/CommentForm';

export function PostBodyWithUser(props) {
	const { setPosts, handleCommentSubmit } = props;
	return (
		<PostBody setPosts={setPosts}>
			<CommentForm
				isCommentForm={false}
				handleCommentSubmit={handleCommentSubmit}
			/>
		</PostBody>
	);
}
