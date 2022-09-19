/* eslint-disable react/prop-types */
import React from 'react';

import {
	PostBotRowContainer,
	PostContentContainer,
	PostImageContainer,
} from './_styles';
import { PostPreviewImage } from './PostPreviewImage';
import { PostPreviewContent } from './PostPreviewContent';

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

	return (
		<>
			<PostImageContainer>
				<PostPreviewImage image={image} id={id} />
			</PostImageContainer>

			<PostContentContainer>
				<PostPreviewContent
					text={text}
					title={title}
					username={user.name}
					timestamp={timestamp}
				/>
			</PostContentContainer>

			{children && (
				<PostBotRowContainer>
					{React.cloneElement(children, {
						id,
						setIsModalActive,
						setLastClickedPostId,
					})}
				</PostBotRowContainer>
			)}
		</>
	);
}
