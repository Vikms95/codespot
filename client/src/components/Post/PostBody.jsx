/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CommentForm } from '../Comment/CommentForm';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { useImage } from '../../hooks/useImage';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { usePostsContext } from '../../context/PostsContext';

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

function PostBody(props) {
	const { postid, setComments, handleCommentSubmit } = props;
	const { user } = useAuth();

	const { posts } = usePostsContext();

	const post = usePost(postid, posts);
	const { title, image, text } = post;

	const imageSrc = useImage(image, [post]);
	const textRef = useHtmlAsText(text);

	return (
		<>
			<Title>{title}</Title>

			{imageSrc?.ok && <Image src={imageSrc?.url} alt='post-portrait' />}

			<Text ref={textRef}></Text>

			{user ? (
				<CommentForm
					postid={postid}
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

export default PostBody;
