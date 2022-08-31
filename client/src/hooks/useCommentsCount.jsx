import { useEffect, useState } from 'react';
import { getOptions } from '../data/requestParams';

export const useCommentsCount = commentID => {
	const [commentsCount, setCommentsCount] = useState();

	useEffect(() => {
		fetch(`/api/${commentID}/comments-count`, getOptions)
			.then(res => res.json())
			.then(data => setCommentsCount(data.count));
	}, []);

	return commentsCount;
};
