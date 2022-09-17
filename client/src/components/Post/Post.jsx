/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComments, createComment } from '../../services/comment';
import { useDerivedComments } from '../../hooks/useDerivedComments';
import { CommentsLayout } from '../../layouts/CommentsLayout';
import { CommentsContextProvider } from '../../context/CommentsContext';
import { commentFields } from '../../data/formFields';
import { useFetch } from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import { setToStorage } from '../../utils/setToStorage';
import { StyledPost } from './_styles';
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

	const [{ data }, commitFetch] = useFetch(createComment);
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
	);
}
