/* eslint-disable react/prop-types */
import React from 'react';
import { PostCommentsContainer } from './_styles';
import { FaComments } from 'react-icons/fa';

export function PostPreviewCommentDisplay({ count }) {
	return (
		<PostCommentsContainer>
			<FaComments />
			{count}
		</PostCommentsContainer>
	);
}
