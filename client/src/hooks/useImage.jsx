import { useState, useEffect } from 'react';

export function useImage(image, dependencies) {
	const [imageSrc, setImageSrc] = useState();

	useEffect(() => {
		if (image) {
			fetch('/images/' + image).then(res => setImageSrc(res || ''));
		}
	}, [...dependencies]);

	return imageSrc;
}
