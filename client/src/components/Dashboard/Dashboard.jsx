/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { PostsLayout } from '../../layouts';
import { LazyPostPreview as PostPreview } from '../PostPreview';
import { useFetch } from '../../hooks/useFetch';
import { getUserPosts } from '../../services/post';
import { usePostsContext } from '../../context/PostsContext';

const StyledDashboard = styled.main`
	min-height: 100vh;
	min-width: 100%;
`;

export function Dashboard(props) {
	const { setPosts, setLastClickedPostId, setIsModalActive } = props;

	const { user } = useContext(AuthContext);
	const { posts } = usePostsContext();
	const { data, error } = useFetch(getUserPosts, user);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<StyledDashboard>
			{posts?.some(post => post.public) && (
				<PostsLayout title='Published posts' section='dashboard'>
					{posts
						.reverse()
						.map(
							post =>
								post.public && (
									<PostPreview
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
									></PostPreview>
								)
						)}
				</PostsLayout>
			)}

			{posts?.some(post => !post.public) && (
				<PostsLayout title='Unpublished posts' section='dashboard'>
					{posts
						.reverse()
						.map(
							post =>
								!post.public && (
									<PostPreview
										key={post._id}
										id={post._id}
										user={post.user}
										title={post.title}
										text={post.text}
										image={post.image}
										timestamp={post.timestamp}
										setLastClickedPostId={setLastClickedPostId}
										setIsModalActive={setIsModalActive}
									></PostPreview>
								)
						)}
				</PostsLayout>
			)}
		</StyledDashboard>
	);
}
