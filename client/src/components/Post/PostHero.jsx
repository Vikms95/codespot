/* eslint-disable react/prop-types */
import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getImage } from '../../services/post';
import { Title, Image } from './_styles';

export function PostHero({ image, title, post }) {
	// console.log('posthero is rendered');
	const [{ data: imageSrc }] = useFetch(getImage, [image], [post]);

	return (
		<>
			<Title>{title && title}</Title>

			{imageSrc?.ok && <Image src={imageSrc?.url} alt='post-portrait' />}
		</>
	);
}
