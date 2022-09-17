/* eslint-disable react/prop-types */
import React from 'react';

import defaultPostImage from '../../assets/default-image.jpg';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { useFetch } from '../../hooks/useFetch';
import { getImage } from '../../services/post';
import { getCommentsCount } from '../../services/comment';
import { FaComments } from 'react-icons/fa';

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
	PostCommentsContainer,
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
		children,
	} = props;

	const [{ data: imageSrc, loading }] = useFetch(getImage, [image], []);
	const [{ data: commentsCount }] = useFetch(getCommentsCount, [id], []);
	const textRef = useHtmlAsText(text);

	return (
		<>
			<PostImageContainer>
				{!loading ? (
					<PostLink to={'/posts/' + id}>
						<BookText>Read more → </BookText>
						{commentsCount > 0 && (
							<PostCommentsContainer>
								<FaComments />
								{commentsCount}
							</PostCommentsContainer>
						)}
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

				{children && (
					<PostBotRowContainer>
						{React.cloneElement(children, {
							id,
							setIsModalActive,
							setLastClickedPostId,
						})}
					</PostBotRowContainer>
				)}
			</PostContentContainer>
		</>
	);
}
