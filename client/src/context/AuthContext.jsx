import { createContext, useContext } from 'react';

export const AuthContext = createContext({
	user: '',
	setUser: () => {},
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};
