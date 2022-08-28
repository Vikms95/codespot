/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';
import PostListContainer from '../containers/PostListContainer';
import PostPreview from './PostPreview';
import { useFetch } from '../hooks/useFetch';
import { getOptions } from '../services/requestParams';
import { usePostsContext } from '../context/PostsContext';

const StyledDashboard = styled.section``;

function Dashboard(props) {
	const { setPosts, setLastClickedPostId, setIsModalActive } = props;

	const { user } = useContext(AuthContext);
	const { posts } = usePostsContext();
	const data = useFetch(`/api/${user}/posts`, getOptions);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<StyledDashboard>
			{posts && (
				<>
					<PostListContainer title='Published posts'>
						{posts?.map(
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
					</PostListContainer>

					<PostListContainer title='Unpublished posts'>
						{posts.map(
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
					</PostListContainer>
				</>
			)}
		</StyledDashboard>
	);
}

export default Dashboard;
