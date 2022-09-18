/* eslint-disable react/prop-types */
import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { getPosts } from '../../services/post';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePostsContext } from '../../context/PostsContext';
import { useFetch } from '../../hooks/useFetch';
import { Text, CommentsTitle } from './_styles';
import { PostHero } from './PostHero';
import { useCommentsContext } from '../../context/CommentsContext';

export function PostBody(props) {
	console.log('postbody is rendered');

	const { children } = props;

	const { user } = useAuth();
	const { postid } = useParams();
	const { posts, setPosts } = usePostsContext().value;

	const post = usePost(postid, posts);
	const [{ data: fetchedPosts }] = useFetch(getPosts, [], []);

	const { comments } = useCommentsContext().value;

	const { title, image, text } = post;

	const textRef = useHtmlAsText(text);

	useEffect(() => {
		if (!posts) {
			setPosts(fetchedPosts);
		}
	}, [fetchedPosts]);

	return (
		<>
			{image && title && <PostHero image={image} post={post} title={title} />}
			{text && <Text ref={textRef}></Text>}

			{children}

			<CommentsTitle>
				{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
			</CommentsTitle>
		</>
	);
}
