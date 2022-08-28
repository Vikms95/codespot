/* eslint-disable react/prop-types */
import React, { createContext, useContext } from 'react';

const PostsContext = createContext({ posts: [], setPosts: () => {} });

const PostsContextProvider = props => {
	return (
		<PostsContext.Provider value={props}>
			{props.children}
		</PostsContext.Provider>
	);
};

const usePostsContext = () => {
	return useContext(PostsContext);
};

export { usePostsContext, PostsContextProvider };
