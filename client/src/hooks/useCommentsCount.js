import { useEffect, useState } from 'react';
import { getCommentsCount } from '../services/comment';

export const useCommentsCount = commentID => {
	const [commentsCount, setCommentsCount] = useState();

	useEffect(() => {
		getCommentsCount(commentID).then(data => setCommentsCount(data.count));
	}, []);

	return commentsCount;
};
