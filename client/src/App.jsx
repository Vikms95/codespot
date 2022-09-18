/* eslint-disable react/react-in-jsx-scope */
import './assets/global.css';
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { AppLayout } from './layouts';
import { AuthRouteWrapper } from './containers/AuthRouteWrapper';

import { AuthContextProvider } from './context/AuthContext';
import { PostsContextProvider } from './context/PostsContext';

import { Home } from './components/Home';
import { Modal } from './components/Modal';
import { Error } from './components/Error';
import { Dashboard } from './components/Dashboard';
import { NavbarWithUser, NavbarWithGuest } from './components/Navbar';
import { LoginForm, RegisterForm, PostForm } from './components/Form';

import { useLocalStorage } from './hooks/useLocalStorage';
import { PostWrapper } from './containers/PostWrapper';

function App() {
	const [user, setUser] = useState();
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [lastClickedPostId, setLastClickedPostId] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);

	return (
		<Router>
			<AuthContextProvider value={{ user, setUser }}>
				{user ? <NavbarWithUser /> : <NavbarWithGuest />}

				<AppLayout>
					<PostsContextProvider value={{ posts, setPosts }}>
						<Routes>
							<Route element={<AuthRouteWrapper />}>
								<Route path='/create' element={<PostForm />} />
								<Route path='/update/:postid' element={<PostForm />} />
								<Route
									path='/dashboard'
									element={
										<Dashboard
											isModalActive={isModalActive}
											lastClickedPostId={lastClickedPostId}
											setIsModalActive={setIsModalActive}
											setLastClickedPostId={setLastClickedPostId}
										/>
									}
								/>
							</Route>

							<Route path='/posts/:postid' element={<PostWrapper />} />
							<Route path='/login' element={<LoginForm setUser={setUser} />} />
							<Route path='/register' element={<RegisterForm />} />
							<Route path='/404' element={<Error />} />
							<Route path='*' element={<Navigate to='/404' replace />} />
							<Route
								path='/'
								element={
									<Home
										isModalActive={isModalActive}
										lastClickedPostId={lastClickedPostId}
										setIsModalActive={setIsModalActive}
										setLastClickedPostId={setLastClickedPostId}
									/>
								}
							/>
						</Routes>

						<Modal
							isModalActive={isModalActive}
							lastClickedPostId={lastClickedPostId}
							setIsModalActive={setIsModalActive}
						/>
					</PostsContextProvider>
				</AppLayout>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
