/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commentFields } from '../../data/formFields';
import { useFetch } from '../../hooks/useFetch';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { AuthContext } from '../../context/AuthContext';
import { setToStorage } from '../../utils/setToStorage';
import { StyledPost } from './_styles';
import { getComments, createComment } from '../../services/comment';
import { PostBodyWithGuest, PostBodyWithUser } from './index';

export function Post(props) {
	const { setPosts } = props;
	const { postid } = useParams();
	const { user } = useContext(AuthContext);

	const [{ data: comments, setData: setComments }] = useFetch(
		getComments,
		[postid],
		[]
	);

	const { rootComments, getChildComments } = useDerivedComments(comments);

	const [, commitFetch] = useFetch(createComment);

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
					comments={comments}
					setPosts={setPosts}
					setComments={setComments}
					handleCommentSubmit={handleCommentSubmit}
				/>
			) : (
				<PostBodyWithGuest comments={comments} setPosts={setPosts} />
			)}

			{props.children &&
				React.cloneElement(props.children, {
					comments,
					setPosts,
					setComments,
					handleCommentSubmit,
				})}
		</StyledPost>
	);
}
