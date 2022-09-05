import { getFromStorage } from './getFromStorage';
import { findByID } from './findbyID';
import { setToStorage } from './setToStorage';
export const getPostToUpdate = (posts, postid) => {
	if (posts.length) {
		const postToUpdate = findByID(posts, postid);

		setToStorage('postToUpdate', postToUpdate);

		return postToUpdate;
	}
	return getFromStorage('postToUpdate');
};
