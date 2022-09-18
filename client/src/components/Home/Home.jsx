/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { LazyPostPreview as PostPreview } from '../PostPreview/';
import { PostsLayout } from '../../layouts';
import { useFetch } from '../../hooks/useFetch';
import { usePostsContext } from '../../context/PostsContext';
import { getPosts } from '../../services/post';
import { StyledHome } from './_styles';

export function Home(props) {
	const { setLastClickedPostId, setIsModalActive } = props;

	const { posts, setPosts } = usePostsContext();
	const [{ data }] = useFetch(getPosts, [], []);

	useEffect(() => {
		setPosts(data?.reverse());
	}, [data]);

	return (
		<StyledHome>
			{posts && (
				<PostsLayout title='Latest post' section='home'>
					{posts.map(
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
			)}
		</StyledHome>
	);
}
