/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CommentForm } from '../Form/CommentForm';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { useImage } from '../../hooks/useImage';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePostsContext } from '../../context/PostsContext';
import { useFetch } from '../../hooks/useFetch';
import { getOptions } from '../../data/requestParams';

const Title = styled.h1`
	font-size: 4em;
`;
const Image = styled.img`
	max-width: 100%;
	max-height: 100rem;
	align-self: center;
	margin-bottom: 3em;
`;

const Text = styled.p`
	font-size: 1.5em;
	margin-bottom: 5em;
	display: flex;
	flex-direction: column;
	text-align: justify;
	max-width: 70ch;
`;

const LoginLinkText = styled.div`
	display: flex;
	column-gap: 2em;
	font-weight: 800;
`;

export function PostBody(props) {
	const { postid, setComments, handleCommentSubmit, setPosts } = props;
	const { user } = useAuth();

	const data = useFetch('/api/posts', getOptions);
	const { posts } = usePostsContext();

	const post = usePost(postid, posts);
	const { title, image, text } = post;

	const imageSrc = useImage(image, [post]);
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
