/* eslint-disable react/prop-types */
import React from 'react';
import { PostBody } from './PostBody';
import { CommentForm } from '../Form/CommentForm';

export function PostBodyWithUser(props) {
	const { handleCommentSubmit } = props;
	return (
		<PostBody>
			<CommentForm
				isCommentForm={false}
				handleCommentSubmit={handleCommentSubmit}
			/>
		</PostBody>
	);
}
