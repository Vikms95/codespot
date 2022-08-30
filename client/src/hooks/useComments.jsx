import { useEffect, useState } from 'react';
import { getOptions } from '../services/requestParams';

export const useComments = postID => {
	const [comments, setComments] = useState();

	useEffect(() => {
		fetch(`/api/${postID}/comments`, getOptions)
			.then(res => res.json())
			.then(data => setComments(data.comments));
	}, []);

	console.log(comments);
	return comments;
};
