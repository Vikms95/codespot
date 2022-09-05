export const findByID = (posts, postid) =>
	posts.find(post => post._id === postid);
