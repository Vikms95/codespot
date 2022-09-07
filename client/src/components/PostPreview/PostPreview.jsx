/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useCommentsCount } from '../../hooks/useCommentsCount';

import defaultPostImage from '../../assets/default-image.jpg';
import { AuthContext } from '../../context/AuthContext';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { useImage } from '../../hooks/useImage';
import { PostPreviewCommentDisplay, PostPreviewButtons } from './index';

import { ImageItem } from '../../assets/imageItem';

import {
	BookText,
	PostBotRowContainer,
	PostContentContainer,
	PostDesc,
	PostImage,
	PostImageContainer,
	PostLink,
	PostTitle,
	PostTopRow,
	PostTopRowContainer,
	StyledBookImage,
} from './_styles';

export default function PostPreview(props) {
	const {
		id,
		user,
		title,
		text,
		image,
		timestamp,
		setIsModalActive,
		setLastClickedPostId,
	} = props;

	const { user: currentUserId } = useContext(AuthContext);
	const commentsCount = useCommentsCount(id);

	const textRef = useHtmlAsText(text);
	const { imageSrc, loaded } = useImage(image);

	return (
		<>
			<PostImageContainer>
				{loaded ? (
					<PostLink to={`/${id}`}>
						<StyledBookImage />
						<BookText>Read this article</BookText>

						<PostImage
							src={imageSrc?.url || defaultPostImage}
							alt='post-preview'
						/>
					</PostLink>
				) : (
					<ImageItem />
				)}
			</PostImageContainer>

			<PostContentContainer>
				<PostTopRowContainer>
					<PostTopRow>{user?.username}</PostTopRow>
					<PostTopRow>{timestamp}</PostTopRow>
				</PostTopRowContainer>

				<PostTitle>{title}</PostTitle>
				<PostDesc ref={textRef}></PostDesc>

				<PostBotRowContainer>
					{user?._id === currentUserId && (
						<PostPreviewButtons
							id={id}
							setIsModalActive={setIsModalActive}
							setLastClickedPostId={setLastClickedPostId}
						/>
					)}

					{commentsCount > 0 && (
						<PostPreviewCommentDisplay count={commentsCount} />
					)}
				</PostBotRowContainer>
			</PostContentContainer>
		</>
	);
}
