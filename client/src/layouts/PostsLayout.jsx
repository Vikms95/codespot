/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledPostsLayout = styled.section`
	gap: 5em;
	margin: 2em 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
	grid-template-rows: repeat(1, 40rem) repeat(auto-fill, minmax(3rem, 1fr));

	& > section {
		grid-column: auto/ span 4;
	}

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
const PostListTitle = styled.h2`
	font-size: 1.5em;
	margin-left: 2em;
`;

function PostsLayout(props) {
	const { children, title } = props;
	return (
		<>
			<PostListTitle>{title}</PostListTitle>

			<StyledPostsLayout>{children}</StyledPostsLayout>
		</>
	);
}

export default PostsLayout;
