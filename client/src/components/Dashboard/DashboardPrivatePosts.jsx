/* eslint-disable react/prop-types */
import React from 'react';
import { PostsLayout } from '../../layouts';
import { LazyPostPreviewWithButtons as PostPreviewWithButtons } from '../PostPreview';

export function DashboardPrivatePosts({ posts, previewProps }) {
	return (
		<PostsLayout title='Unpublished posts' section='dashboard'>
			{posts.map(
				post =>
					!post.public && <PostPreviewWithButtons {...previewProps(post)} />
			)}
		</PostsLayout>
	);
}
