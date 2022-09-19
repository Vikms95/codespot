/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { getUserPosts } from '../../services/post';
import { usePostsContext } from '../../context/PostsContext';
import { EmptyDashboard } from './EmptyDashboard';
import { StyledDashboard } from './_styles';
import { addPropsToChildren } from '../../utils/addPropsToChildren';

export function Dashboard({ setLastClickedPost, setIsModalActive, children }) {
	const { user } = useAuthContext();
	const { posts, setPosts } = usePostsContext();
	const [{ data }] = useFetch(getUserPosts, [user], []);

	const previewProps = post => {
		return {
			key: post._id,
			id: post._id,
			user: post.user,
			title: post.title,
			text: post.text,
			image: post.image,
			timestamp: post.timestamp,
			isPublic: post.public,
			setIsModalActive,
			setLastClickedPost,
		};
	};

	useEffect(() => {
		setPosts(data?.reverse());
	}, [data]);

	const hasNoPost = useMemo(() => posts?.length === 0, [posts]);
	const hasPublicPost = useMemo(
		() => posts?.some(post => post.public),
		[posts]
	);
	const hasPrivatePost = useMemo(
		() => posts?.some(post => !post.public),
		[posts]
	);

	return (
		<StyledDashboard>
			{hasNoPost ? (
				<EmptyDashboard />
			) : (
				<>
					{hasPublicPost &&
						React.Children.toArray(
							addPropsToChildren(children[0], { posts, previewProps })
						)}

					{hasPrivatePost &&
						React.Children.toArray(
							addPropsToChildren(children[1], { posts, previewProps })
						)}
				</>
			)}
		</StyledDashboard>
	);
}
