import React from 'react';
import styled from 'styled-components';
import emptyDashboardImage from '../../assets/empty-dashboard.webp';
import { useFadeIn } from '../../hooks/useFadeIn';

const EmptyDashboardImage = styled.img`
	height: auto;
	width: 40em;
`;
const EmptyDashboardContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
`;
const EmptyDashboardText = styled.h1`
	display: flex;
	justify-content: center;
`;

function EmptyDashboard() {
	const isActive = useFadeIn();

	return (
		<EmptyDashboardContainer isActive={isActive}>
			<h1>We were looking for your ideas, but did not find them.</h1>
			<h2>Want to show us your first one? </h2>
			<h3>
				{' '}
				<a href='/#/create'> Create your first post </a>{' '}
			</h3>
			<EmptyDashboardImage src={emptyDashboardImage} />
		</EmptyDashboardContainer>
	);
}

export default EmptyDashboard;
