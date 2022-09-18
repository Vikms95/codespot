/* eslint-disable react/prop-types */
import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { getImage } from '../../services/post';
import { Title, Image } from './_styles';

export function PostHero(props) {
	const { image, title, post } = props;

	const [{ data: imageSrc }] = useFetch(getImage, [image], [post]);

	console.log('posthero is rendered');
	return (
		<>
			<Title>{title && title}</Title>

			{imageSrc?.ok && <Image src={imageSrc?.url} alt='post-portrait' />}
		</>
	);
}
