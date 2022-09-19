/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getImage } from '../../services/post';
import { getCommentsCount } from '../../services/comment';
import defaultPostImage from '../../assets/default-image.jpg';
import { ImageItem } from '../../assets/imageItem';
import { FaComments } from 'react-icons/fa';

import {
	BookText,
	PostImage,
	PostImageContainer,
	PostLink,
	PostCommentsContainer,
} from './_styles';

export function PostPreviewImage({ image, id }) {
	const [{ data: imageSrc, loading }] = useFetch(getImage, [image], []);
	const [{ data: commentsCount }] = useFetch(getCommentsCount, [id], []);

	const hasComments = () => commentsCount > 0;
	return (
		<>
			{loading ? (
				<ImageItem />
			) : (
				<PostLink to={'/posts/' + id}>
					<BookText>Read more → </BookText>

					{hasComments && (
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
			)}
		</>
	);
}
