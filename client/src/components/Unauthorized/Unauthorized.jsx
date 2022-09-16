import React from 'react';

import styled from 'styled-components';
import unauthorizedImage from '../../assets/unauthorized-image.webp';
import { useFadeIn } from '../../hooks/useFadeIn';

const UnauthorizedImage = styled.img`
	height: auto;
	width: 40em;
`;
const UnauthorizedContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
`;

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
