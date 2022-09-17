/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { getPosts } from '../../services/post';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePostsContext } from '../../context/PostsContext';
import { useFetch } from '../../hooks/useFetch';
import { Text, CommentsTitle } from './_styles';
import { PostHero } from './PostHero';

export function PostBody(props) {
	const { children, comments, setPosts } = props;

	const { user } = useAuth();
	const { postid } = useParams();
	const { posts } = usePostsContext();
	const post = usePost(postid, posts);
	const [{ data: fetchedPosts }] = useFetch(getPosts, [], []);

	const { title, image, text } = post;

	const textRef = useHtmlAsText(text);

	useEffect(() => {
		setPosts(fetchedPosts);
	}, [fetchedPosts]);

	return (
		<>
			<PostHero image={image} post={post} title={title} />
			<Text ref={textRef}></Text>

			{children}

			<CommentsTitle>
				{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
			</CommentsTitle>
		</>
	);
}
