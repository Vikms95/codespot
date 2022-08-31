/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledPostsLayout = styled.section`
	gap: 5em;
	margin: 2em 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));

	& > section {
		grid-column: auto/ span 4;
	}

	> * {
		:nth-child(1) {
			grid-column: 1 / 8;
		}

		:nth-child(2) {
			grid-column: 8 / 13;
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
