/* eslint-disable react/prop-types */
import React from 'react';
import { Post } from './Post';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { CommentsContextProvider } from '../../context/CommentsContext';

export function PostWithComments(props) {
	const { comments, setPosts, setComments, handleCommentSubmit } = props;
	const { rootComments, getChildComments } = useDerivedComments(comments);

	return (
		<CommentsContextProvider value={comments}>
			<Post setPosts={setPosts}>
				<CommentsLayout
					comments={rootComments}
					setComments={setComments}
					getChildComments={getChildComments}
					handleCommentSubmit={handleCommentSubmit}
				/>
			</Post>
		</CommentsContextProvider>
	);
}
