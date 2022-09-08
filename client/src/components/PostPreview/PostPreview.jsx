/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import defaultPostImage from '../../assets/default-image.jpg';
import { AuthContext } from '../../context/AuthContext';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { useFetch } from '../../hooks/useFetch';
import { getImage } from '../../services/post';
import { getCommentsCount } from '../../services/comment';
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
	const { data: imageSrc, loading } = useFetch(getImage, image);
	const { data: commentsCount } = useFetch(getCommentsCount, id);
	const textRef = useHtmlAsText(text);

	return (
		<>
			<PostImageContainer>
				{!loading ? (
					<PostLink to={'/' + id}>
						<BookText>Read more → </BookText>
						<PostImage
							src={image ? imageSrc?.url : defaultPostImage}
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
