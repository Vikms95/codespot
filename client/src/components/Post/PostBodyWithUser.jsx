/* eslint-disable react/prop-types */
import React from 'react';
import { PostBody } from './PostBody';
import { CommentForm } from '../Form/CommentForm';

export function PostBodyWithUser(props) {
	const { comments, setComments, setPosts, handleCommentSubmit } = props;
	return (
		<PostBody comments={comments} setPosts={setPosts}>
			<CommentForm
				isCommentForm={false}
				setComments={setComments}
				handleCommentSubmit={handleCommentSubmit}
			/>
		</PostBody>
	);
}
