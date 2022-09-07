/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { PostBody } from './PostBody';
import { useParams } from 'react-router-dom';
import { useComments } from '../../hooks/useComments';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { CommentsContextProvider } from '../../context/CommentsContext';
import { createComment } from '../../services/createComment';
import { commentFields } from '../../data/formFields';

const StyledPost = styled.section`
	margin: 0 5em 5em 5em;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CommentsTitle = styled.h1``;

export function Post(props) {
	const { setPosts } = props;
	const { postid } = useParams();

	const { comments, setComments } = useComments(postid);
	const { rootComments, getChildComments } = useDerivedComments(comments);

	const handleCommentSubmit = async (
		e,
		setFormData,
		text,
		userid,
		parentid
	) => {
		e.preventDefault();

		const comment = await createComment(text, postid, userid, parentid);
		setComments(prevComments => [...prevComments, comment]);
		setFormData(commentFields);
	};

	return (
		<>
			<StyledPost>
				<PostBody
					postid={postid}
					setPosts={setPosts}
					setComments={setComments}
					handleCommentSubmit={handleCommentSubmit}
				/>

				<CommentsTitle>
					{comments?.length > 0 ? 'Comments' : 'There are no comments...'}
				</CommentsTitle>

				<CommentsContextProvider value={comments}>
					<CommentsLayout
						comments={rootComments}
						setComments={setComments}
						getChildComments={getChildComments}
						handleCommentSubmit={handleCommentSubmit}
					/>
				</CommentsContextProvider>
			</StyledPost>
		</>
	);
}
