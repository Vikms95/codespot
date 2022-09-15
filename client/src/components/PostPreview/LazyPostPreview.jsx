import React from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';

const PostPreview = React.lazy(() => import('./PostPreview'));

export function LazyPostPreview(props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? <PostPreview {...props}></PostPreview> : null}
		</StyledPostPreview>
	);
}
