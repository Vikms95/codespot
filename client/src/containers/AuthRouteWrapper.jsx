/* eslint-disable react/prop-types */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Component to wrap any component that is rendered after a protected route.
 * It will call the useAuth hook which will verify the user and return its id.
 * Then it does return the user id if it is verified, otherwise it returns null.
 */
export function AuthRouteWrapper() {
	const { user } = useAuth();

	return user && <Outlet />;
}
