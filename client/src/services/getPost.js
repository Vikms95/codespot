export const getPost = (posts, postid) =>
	posts.find(post => post._id === postid);
