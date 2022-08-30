/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { useImage } from '../hooks/useImage';
import { useHtmlAsText } from '../hooks/useHtmlAsText';
import { usePostsContext } from '../context/PostsContext';
import {useComments} from '../hooks/useComments'
import {CommentSection} from './Comment/CommentSection'

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

function Post() {
	const { posts } = usePostsContext();
	const { postid } = useParams();

	const post = usePost(postid, posts);
	const { title, image, text } = post;

	const imageSrc = useImage(image, [post]);
	const textRef = useHtmlAsText(text);
  const comments = useComments(postid)

	return (
		<>
			<StyledPost>
				<Title>{title}</Title>
				{imageSrc?.ok && (
					<Image src={imageSrc?.url} alt='post-portrait'></Image>
				)}
				<Text ref={textRef}></Text>
        <CommentSection comments={comments}>

        </CommentSection>
			</StyledPost>
		</>
	);
}

export default Post;
