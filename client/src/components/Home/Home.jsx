/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyPostPreview as PostPreview } from '../PostPreview/';
import { PostsLayout } from '../../layouts';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { usePostsContext } from '../../context/PostsContext';
import { getPosts } from '../../services/post';

const StyledHome = styled.main`
	min-height: 100vh;
	min-width: 100%;
`;

export function Home(props) {
	const { setPosts, setLastClickedPostId, setIsModalActive } = props;

	const { data } = useFetch(getPosts);
	const { posts } = usePostsContext();

	useAuth();

	useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<StyledHome>
			{posts && (
				<>
					<PostsLayout title='Latest post' section='home'>
						{posts
							?.reverse()
							.map(
								post =>
									post.public && (
										<PostPreview
											key={post._id}
											id={post._id}
											user={post.user}
											text={post.text}
											title={post.title}
											image={post.image}
											timestamp={post.timestamp}
											setIsModalActive={setIsModalActive}
											setLastClickedPostId={setLastClickedPostId}
										></PostPreview>
									)
							)}
					</PostsLayout>
				</>
			)}
		</StyledHome>
	);
}
