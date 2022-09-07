import React from 'react';
import { userNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';

const PostPreview = React.lazy(() => import('./PostPreview'));

export function LazyPostPreview(props) {
	const { isNearScreen, fromRef } = userNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? <PostPreview {...props}></PostPreview> : null}
		</StyledPostPreview>
	);
}
