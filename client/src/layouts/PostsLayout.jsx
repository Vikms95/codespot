/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledPostsLayout = styled.section`
	gap: 5em;
	margin: 2em 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
	grid-auto-rows: 0.5fr;

	> * {
		&:first-child {
			grid-column: span 2;
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
