import React from 'react';
import { userNearScreen } from '../../hooks/useNearScreen';
import { useFadeIn } from '../../hooks/useFadeIn';

import { StyledComment } from './_styles.js';

const Comment = React.lazy(() => import('./Comment'));

export function LazyComment(props) {
	const { isNearScreen, fromRef } = userNearScreen();
	const isActive = useFadeIn();

	return (
		<StyledComment ref={fromRef} isActive={isActive}>
			{isNearScreen ? <Comment {...props}></Comment> : null}
		</StyledComment>
	);
}
