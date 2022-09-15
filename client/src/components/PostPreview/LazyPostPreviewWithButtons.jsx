import React from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';

const PostPreviewWithButtons = React.lazy(() =>
	import('./PostPreviewWithButtons')
);

export function LazyPostPreviewWithButtons(props) {
	const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' });
	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? (
				<PostPreviewWithButtons {...props}></PostPreviewWithButtons>
			) : null}
		</StyledPostPreview>
	);
}
