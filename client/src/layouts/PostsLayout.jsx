/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledPostsLayout = styled.section`
	min-height: 100vh;
	gap: 5em;
	margin-left: '2em';
	margin-bottom: 5em;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
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
							max-height: 40rem;

							& > article > a > img {
								height: 25rem;
							}
						}

						:nth-child(2) {
							grid-column: 8 / 13;
							max-height: 40rem;

							& > article > a > img {
								height: 25rem;
							}
						}
					}
				`;
		}
	}}
`;
const PostListTitle = styled.h2`
	font-size: 1.5em;
	margin-left: 2em;
`;

export function PostsLayout(props) {
	const { children, title, section } = props;
	return (
		<>
			<PostListTitle section={section}>{title}</PostListTitle>

			<StyledPostsLayout section={section}>{children}</StyledPostsLayout>
		</>
	);
}
