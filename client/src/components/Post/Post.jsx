/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commentFields } from '../../data/formFields';
import { useFetch } from '../../hooks/useFetch';
import { useAuthContext } from '../../context/AuthContext';
import { setToStorage } from '../../utils/setToStorage';
import { StyledPost } from './_styles';
import { createComment } from '../../services/comment';
import { PostBodyWithGuest, PostBodyWithUser } from './index';
import { useCommentsContext } from '../../context/CommentsContext';

export function Post({ children }) {
	console.log('post is rendered');
	const { postid } = useParams();
	const { user } = useAuthContext();
	const [, commitFetch] = useFetch(createComment);
	const { setComments } = useCommentsContext().value;

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

		const comment = await commitFetch([text, postid, userid, parentid]);
		if (!comment) return;

		setComments(prevComments => [...prevComments, comment]);
		setFormData(commentFields);
	};

	return (
		<StyledPost>
			{user ? (
				<PostBodyWithUser handleCommentSubmit={handleCommentSubmit} />
			) : (
				<PostBodyWithGuest />
			)}

			{children &&
				React.cloneElement(children, {
					handleCommentSubmit,
				})}
		</StyledPost>
	);
}
