/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useFadeIn } from '../hooks/useFadeIn';

const StyledPostsLayout = styled.section`
	min-height: 100vh;
	min-width: 100%;
	gap: 5em;
	margin-bottom: 5em;
	opacity: ${props => (props.isActive ? 1 : 0)};
	transition: opacity 0.5s, visibility 0.5s linear;

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
	grid-template-rows:
		${props =>
			props.section === 'home'
				? 'repeat(1, 40rem) repeat(auto-fill, minmax(3rem, 1fr));'
				: 'repeat(auto-fill, minmax(3rem, 1fr));'}
		& > section {
		grid-column: auto/ span 4;
	}
	${props => {
		if (props.section === 'home') {
			return `
					> * {
						:nth-child(1) {
							grid-column: 1 / 8;
							height: 40rem;
              min-width: 50rem;

							& > article > a > img {
								height: 25rem;
							}
              
							& > article > svg {
								height: 25rem;
							}
						}
            
						:nth-child(2) {
              grid-column: 8 / 13;
							height: 40rem;
              min-width: 30rem;

							& > article > a > img {
                height: 25rem;
							}

              & > article > svg {
                height: 25rem;
              }
						}
					}
				`;
		}
	}};
`;
const PostListTitle = styled.h2`
	font-size: 1.5em;
`;

export function PostsLayout(props) {
	const { children, title, section } = props;
	const isActive = useFadeIn();

	return (
		<>
			<PostListTitle section={section}>{title}</PostListTitle>

			<StyledPostsLayout section={section} isActive={isActive}>
				{children}
			</StyledPostsLayout>
		</>
	);
}
