import React from 'react';
import { userNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';

const PostPreviewWithButtons = React.lazy(() =>
	import('./PostPreviewWithButtons')
);

export function LazyPostPreviewWithButtons(props) {
	const { isNearScreen, fromRef } = userNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? (
				<PostPreviewWithButtons {...props}></PostPreviewWithButtons>
			) : null}
		</StyledPostPreview>
	);
}
