/* eslint-disable react/prop-types */
import React from 'react';
import { PostsLayout } from '../../layouts';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '../PostPreview';

export function DashboardPublicPosts({ posts, previewProps }) {
	return (
		<PostsLayout title='Published posts' section='dashboard'>
			{posts.map(
				post =>
					post.public && <PostPreviewWithButtons {...previewProps(post)} />
			)}
		</PostsLayout>
	);
}
