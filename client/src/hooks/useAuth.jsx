import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { verifyUser } from '../services/verifyUser';

/**
 * Hook used everytime we want to check for validity of the JWT token
 * before entering a route or to have that user id available in the component
 * outside of the protected routes. It won't be used for Post since that would
 * mean making a JWT verification for each Post rendered
 */
export function useAuth() {
	const { user, setUser } = useContext(AuthContext);

	useEffect(() => {
		verifyUser().then(authResult => {
			setUser(authResult.user);
		});
	}, []);
	return { user };
}
