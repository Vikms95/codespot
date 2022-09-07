import React, { useState, useEffect, useRef } from 'react';

export function userNearScreen({ distance = '100px' } = {}) {
	const [isNearScreen, setShow] = useState(false);
	const fromRef = useRef(null);

	useEffect(() => {
		const onChange = (entries, observer) => {
			const el = entries[0];

			if (el.isIntersecting) {
				setShow(true);
				observer.disconnect();
			}
		};

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance,
		});

		observer.observe(fromRef.current);

		return () => observer.disconnect();
	});

	return { isNearScreen, fromRef };
}
