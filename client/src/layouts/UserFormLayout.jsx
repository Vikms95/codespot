import React from 'react';
import styled from 'styled-components';

export const UserFormLayout = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 5em;
	margin-top: -5em;
	opacity: ${props => (props.isActive ? 1 : 0)};
	margin-right: ${props => (props.isActive ? 'none' : '5em')};
	transition: margin-right 0.5s ease-out, opacity 0.8s, visibility 0.5s linear;
`;
