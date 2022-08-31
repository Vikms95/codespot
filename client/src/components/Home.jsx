/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview/PostPreview';
import PostListContainer from '../layouts/PostsLayout';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { getOptions } from '../data/requestParams';
import { usePostsContext } from '../context/PostsContext';

const StyledHome = styled.main``;

function Home(props) {
	useAuth();

	const { setPosts, setLastClickedPostId, setIsModalActive } = props;

	const data = useFetch('/api/posts', getOptions);
	const { posts } = usePostsContext();

	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<StyledHome>
			{posts && (
				<>
					<PostListContainer>
						{posts.map(
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
										setLastClickedPostId={setLastClickedPostId}
										setIsModalActive={setIsModalActive}
									></PostPreview>
								)
						)}
					</PostListContainer>
				</>
			)}
		</StyledHome>
	);
}

export default Home;
