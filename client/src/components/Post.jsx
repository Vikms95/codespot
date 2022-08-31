/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useAuth } from '../hooks/useAuth';
import { useImage } from '../hooks/useImage';
import { useHtmlAsText } from '../hooks/useHtmlAsText';
import { usePostsContext } from '../context/PostsContext';
import { useComments } from '../hooks/useComments';
import { CommentsLayout } from '../layouts/CommentsLayout';
import { CommentForm } from './Comment/CommentForm';

const StyledPost = styled.section`
	margin: 5em;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

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
	max-width: 70%;
`;

const LoginLinkText = styled.div`
	display: flex;
	column-gap: 2em;
	font-weight: 800;
`;

function Post() {
	const { posts } = usePostsContext();
	const { postid } = useParams();

	const post = usePost(postid, posts);
	const { title, image, text } = post;

	const { user } = useAuth();
	const imageSrc = useImage(image, [post]);
	const textRef = useHtmlAsText(text);
	const { comments, setComments } = useComments(postid);

	return (
		<>
			<StyledPost>
				<Title>{title}</Title>

				{imageSrc?.ok && (
					<Image src={imageSrc?.url} alt='post-portrait'></Image>
				)}

				<Text ref={textRef}></Text>

				{user ? (
					<CommentForm postid={postid} setComments={setComments}></CommentForm>
				) : (
					<LoginLinkText>
						<span>Want to leave your comment?</span>{' '}
						<Link to='/login'>Login</Link>
					</LoginLinkText>
				)}

				<CommentsLayout comments={comments}></CommentsLayout>
			</StyledPost>
		</>
	);
}

export default Post;
