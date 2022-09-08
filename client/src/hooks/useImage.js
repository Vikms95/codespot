import { useState, useEffect } from 'react';
import { getImage } from '../services/getImage';

export function useImage(image, dependencies) {
	const [imageSrc, setImageSrc] = useState();
  const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (image) {
			getImage(image).then(res =>{
        console.log(image)
        setImageSrc(res)
        setLoaded(true)
      });
      }
    }, [image]);
    
	return {imageSrc, loaded};
}
