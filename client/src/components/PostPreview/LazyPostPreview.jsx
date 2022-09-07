import React from 'react';
import { userNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';

const PostPreview = React.lazy(() => import('./PostPreview'));

export function LazyPostPreview(props) {
	const { isNearScreen, fromRef } = userNearScreen();
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? <PostPreview {...props}></PostPreview> : null}
		</StyledPostPreview>
	);
}
