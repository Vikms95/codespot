/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commentFields } from '../../data/formFields';
import { useFetch } from '../../hooks/useFetch';
import { AuthContext, useAuthContext } from '../../context/AuthContext';
import { setToStorage } from '../../utils/setToStorage';
import { StyledPost } from './_styles';
import { createComment } from '../../services/comment';
import { PostBodyWithGuest, PostBodyWithUser } from './index';
import { useCommentsContext } from '../../context/CommentsContext';

export function Post(props) {
	const { setPosts } = props;
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
				<PostBodyWithUser
					setPosts={setPosts}
					handleCommentSubmit={handleCommentSubmit}
				/>
			) : (
				<PostBodyWithGuest setPosts={setPosts} />
			)}

			{props.children &&
				React.cloneElement(props.children, {
					setPosts,
					handleCommentSubmit,
				})}
		</StyledPost>
	);
}
