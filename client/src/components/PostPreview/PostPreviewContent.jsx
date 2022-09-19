/* eslint-disable react/prop-types */
import React from 'react';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import {
	PostDesc,
	PostTitle,
	PostTopRow,
	PostTopRowContainer,
} from './_styles';

export function PostPreviewContent({ username, timestamp, title, text }) {
	const textRef = useHtmlAsText(text);

	return (
		<>
			<PostTopRowContainer>
				<PostTopRow>{username}</PostTopRow>
				<PostTopRow>{timestamp}</PostTopRow>
			</PostTopRowContainer>

			<PostTitle>{title}</PostTitle>
			<PostDesc ref={textRef}></PostDesc>
		</>
	);
}
