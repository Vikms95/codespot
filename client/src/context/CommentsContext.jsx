/* eslint-disable react/prop-types */
import React, { createContext, useContext } from 'react';

const CommentsContext = createContext({ comments: [], setComments: () => {} });

const CommentsContextProvider = props => {
	return (
		<CommentsContext.Provider value={props}>
			{props.children}
		</CommentsContext.Provider>
	);
};

const useCommentsContext = () => {
	return useContext(CommentsContext);
};

export { useCommentsContext, CommentsContextProvider };
