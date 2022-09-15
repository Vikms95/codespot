import React from 'react';
import { useNearScreen } from '../../hooks/useNearScreen';

import { StyledComment } from './_styles.js';

const Comment = React.lazy(() => import('./Comment'));

export function LazyComment(props) {
	const { isNearScreen, fromRef } = useNearScreen();

	return (
		<StyledComment ref={fromRef}>
			{isNearScreen ? <Comment {...props}></Comment> : null}
		</StyledComment>
	);
}
