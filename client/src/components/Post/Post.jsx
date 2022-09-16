/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PostBody } from './PostBody';
import { useParams } from 'react-router-dom';
import { getComments, createComment } from '../../services/comment';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { CommentsContextProvider } from '../../context/CommentsContext';
import { commentFields } from '../../data/formFields';
import { useFetch } from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import { setToStorage } from '../../utils/setToStorage';
import { StyledPost, CommentsTitle } from './_styles';

export function Post(props) {
	const { setPosts } = props;
	const { postid } = useParams();
	const { user } = useContext(AuthContext);

	const {
		data: comments,
		setData: setComments,
		error,
	} = useFetch(getComments, postid);

	const { rootComments, getChildComments } = useDerivedComments(comments);

	useEffect(() => {
		if (!user) {
			setToStorage('postToRedirect', postid);
		} else {
			localStorage.removeItem('postToRedirect');
		}
	}, [user]);

	const handleCommentSubmit = async (
		e,
		setFormData,
		text,
		userid,
		parentid
	) => {
		e.preventDefault();

		const comment = await createComment(text, postid, userid, parentid);
		if (!comment) return;

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

				{comments?.length > 0 && (
					<CommentsContextProvider value={comments}>
						<CommentsLayout
							comments={rootComments}
							setComments={setComments}
							getChildComments={getChildComments}
							handleCommentSubmit={handleCommentSubmit}
						/>
					</CommentsContextProvider>
				)}
			</StyledPost>
		</>
	);
}
