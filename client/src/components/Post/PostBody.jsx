/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CommentForm } from '../Form/CommentForm';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { getImage, getPosts } from '../../services/post';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePostsContext } from '../../context/PostsContext';
import { useFetch } from '../../hooks/useFetch';
import { Title, Image, Text, LoginLinkText } from './_styles';

export function PostBody(props) {
	const { postid, setComments, handleCommentSubmit, setPosts } = props;
	const { user } = useAuth();
	const { data, error: postError } = useFetch(getPosts);

	const { posts } = usePostsContext();
	const post = usePost(postid, posts);
	const { title, image, text } = post;

	const { data: imageSrc, error: imageError } = useFetch(getImage, image, [
		post,
	]);

	const textRef = useHtmlAsText(text);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<>
			<Title>{title && title}</Title>

			{imageSrc?.ok && <Image src={imageSrc?.url} alt='post-portrait' />}

			<Text ref={textRef && textRef}></Text>

			{user ? (
				<CommentForm
					postid={postid}
					isCommentForm={false}
					setComments={setComments}
					handleCommentSubmit={handleCommentSubmit}
				/>
			) : (
				<LoginLinkText>
					<span>Want to leave your comment?</span>{' '}
					<Link to='/login'>Login</Link>
				</LoginLinkText>
			)}
		</>
	);
}
