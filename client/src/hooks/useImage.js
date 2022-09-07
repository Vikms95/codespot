import { useState, useEffect } from 'react';
import { getImage } from '../services/getImage';

export function useImage(image, dependencies) {
	const [imageSrc, setImageSrc] = useState();

	useEffect(() => {
		if (image) {
			getImage(image).then(res => setImageSrc(res || ''));
		}
	}, [...dependencies]);

	return imageSrc;
}
