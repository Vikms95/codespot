/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PostsLayout } from '../../layouts';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '../PostPreview';
import { useFetch } from '../../hooks/useFetch';
import { getUserPosts } from '../../services/post';
import { usePostsContext } from '../../context/PostsContext';
import { EmptyDashboard } from './EmptyDashboard';
import { StyledDashboard } from './_styles';

export function Dashboard(props) {
	const { setPosts, setLastClickedPostId, setIsModalActive } = props;

	const { user } = useContext(AuthContext);
	const { posts } = usePostsContext();
	const [{ data }] = useFetch(getUserPosts, [user], [user]);

	useEffect(() => {
		setPosts(data?.reverse());
	}, [data]);

	return (
		<StyledDashboard>
			<>
				{posts?.length === 0 ? (
					<EmptyDashboard />
				) : (
					<>
						{posts?.some(post => post.public) && (
							<PostsLayout title='Published posts' section='dashboard'>
								{posts.map(
									post =>
										post.public && (
											<PostPreviewWithButtons
												key={post._id}
												id={post._id}
												user={post.user}
												title={post.title}
												text={post.text}
												image={post.image}
												timestamp={post.timestamp}
												isPublic={post.public}
												setLastClickedPostId={setLastClickedPostId}
												setIsModalActive={setIsModalActive}
											></PostPreviewWithButtons>
										)
								)}
							</PostsLayout>
						)}

						{posts?.some(post => !post.public) && (
							<PostsLayout title='Unpublished posts' section='dashboard'>
								{posts.map(
									post =>
										!post.public && (
											<PostPreviewWithButtons
												key={post._id}
												id={post._id}
												user={post.user}
												title={post.title}
												text={post.text}
												image={post.image}
												timestamp={post.timestamp}
												setLastClickedPostId={setLastClickedPostId}
												setIsModalActive={setIsModalActive}
											></PostPreviewWithButtons>
										)
								)}
							</PostsLayout>
						)}
					</>
				)}
			</>
		</StyledDashboard>
	);
}
