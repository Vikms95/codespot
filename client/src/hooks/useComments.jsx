import { useEffect, useState } from 'react';
import { getComments } from '../services/getComments';

export const useComments = postID => {
	const [comments, setComments] = useState();

	useEffect(() => {
		getComments(postID).then(data => setComments(data.comments));
	}, []);

	return { comments, setComments };
};
