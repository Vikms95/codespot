import { useEffect, useRef } from 'react';

function useHtmlAsText(text) {
	const textRef = useRef(null);

	useEffect(() => {
		if (textRef.current) {
			textRef.current.innerHTML = text;
		}
	}, [text]);
	return textRef;
}

export { useHtmlAsText };
