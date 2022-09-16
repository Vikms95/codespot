import React from 'react';

import unauthorizedImage from '../../assets/unauthorized-image.webp';
import { useFadeIn } from '../../hooks/useFadeIn';
import { UnauthorizedContainer, UnauthorizedImage } from './_styles';

export function Unauthorized() {
	const isActive = useFadeIn();

	return (
		<UnauthorizedContainer isActive={isActive}>
			<h1>You are not allowed in our bubble.</h1>
			<h2>Want to share your ideas? </h2>
			<h3>
				{' '}
				<a href='/register'>Register</a>
				<span> or </span> <a href='/login'>Login</a>{' '}
			</h3>
			<UnauthorizedImage src={unauthorizedImage} />
		</UnauthorizedContainer>
	);
}
