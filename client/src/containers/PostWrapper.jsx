/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getComments } from '../services/comment';
import { Post } from '../components/Post/Post';
import { PostWithComments } from '../components/Post/PostWithComments';
import { CommentsContextProvider } from '../context/CommentsContext';

export function PostWrapper() {
	const { postid } = useParams();
	const [{ data: comments, setData: setComments }] = useFetch(
		getComments,
		[postid],
		[]
	);

	if (typeof comments === 'undefined') return;
	return (
		<>
			<CommentsContextProvider value={{ comments, setComments }}>
				{comments.length === 0 ? <Post /> : <PostWithComments />}
			</CommentsContextProvider>
		</>
	);
}
