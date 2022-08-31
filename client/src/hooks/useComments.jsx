import { useEffect, useMemo, useState } from 'react';
import { getComments } from '../services/getComments';

export const useComments = postID => {
	const [comments, setComments] = useState();

	const commentByParentID = useMemo(() => {
		if (!comments) return [];

		const group = {};

		comments.forEach(comment => {
			group[comment.parent] ||= [];
			group[comment.parent].push(comment);
		});

		return group;
	}, [comments]);

	const getReplies = parent => {
		return commentByParentID[parent];
	};

	useEffect(() => {
		getComments(postID).then(data => setComments(data.comments));
	}, []);

	return {
		comments,
		setComments,
		getReplies,
		rootComments: commentByParentID.null,
	};
};
