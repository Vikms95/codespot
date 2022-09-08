import { useEffect,  useState } from 'react';
import { getComments } from '../services/comment';

export const useComments = postID => {
	const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

	useEffect(() => {
		getComments(postID)
      .then(data => setComments(data.comments))
      .catch(err => setError(err));
	}, []);

	return {
		comments,
		setComments,
	};
};
