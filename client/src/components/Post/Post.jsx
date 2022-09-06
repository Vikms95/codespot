/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PostBody from './PostBody';
import { useParams } from 'react-router-dom';
import { useComments } from '../../hooks/useComments';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { CommentsContextProvider } from '../../context/CommentsContext';

const StyledPost = styled.section`
	margin: 5em;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CommentsTitle = styled.h1``;

function Post() {
	const { postid } = useParams();

	const { comments, setComments } = useComments(postid);
	const { rootComments, getChildComments } = useDerivedComments(comments);

	return (
		<>
			<StyledPost>
				<PostBody postid={postid} setComments={setComments} />

				<CommentsTitle>
					{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
				</CommentsTitle>

				<CommentsContextProvider value={comments}>
					<CommentsLayout
						comments={rootComments}
						getChildComments={getChildComments}
						setComments={setComments}
					/>
				</CommentsContextProvider>
			</StyledPost>
		</>
	);
}

export default Post;
