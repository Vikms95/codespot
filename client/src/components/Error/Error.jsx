import React from 'react';

import styled from 'styled-components';
import errorImage from '../../assets/error-404-image.webp';
import { useFadeIn } from '../../hooks/useFadeIn';

const ErrorImage = styled.img`
	height: auto;
	width: 40em;
`;
const ErrorContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
`;

export function Error() {
	const isActive = useFadeIn();

	return (
		<ErrorContainer isActive={isActive}>
			<h1>It seems like you are lost.</h1>
			<h2>
				Let us guide you by bringing you to our<a href='/#/'> Home</a>
			</h2>
			<ErrorImage src={errorImage} />
		</ErrorContainer>
	);
}
