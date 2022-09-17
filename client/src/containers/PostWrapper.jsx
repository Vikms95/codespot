/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getCommentsCount } from '../services/comment';
import { PostWithComments } from '../components/Post/PostWithComments';
import { Post } from '../components/Post/Post';

function PostProvider({ setPosts }) {
	const { postid } = useParams();
	const [{ data: commentsCount }] = useFetch(getCommentsCount, [postid], []);

	if (typeof commentsCount !== 'undefined') {
		return (
			<>
				{commentsCount === 0 ? (
					<Post setPosts={setPosts} />
				) : (
					<PostWithComments setPosts={setPosts} />
				)}
			</>
		);
	}
}

export default PostProvider;
