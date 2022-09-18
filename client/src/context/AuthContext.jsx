/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

const AuthContext = createContext({
	user: '',
	setUser: () => {},
});

const AuthContextProvider = props => {
	return (
		<AuthContext.Provider value={props.value}>
			{props.children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
