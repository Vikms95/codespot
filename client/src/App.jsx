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
import {
	Dashboard,
	DashboardPrivatePosts,
	DashboardPublicPosts,
} from './components/Dashboard';
import { NavbarWithUser, NavbarWithGuest } from './components/Navbar';
import { LoginForm, RegisterForm, PostForm } from './components/Form';

import { useLocalStorage } from './hooks/useLocalStorage';
import { PostWrapper } from './containers/PostWrapper';

function App() {
	const [user, setUser] = useState();
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [isModalActive, setIsModalActive] = useState(false);
	const [lastClickedPost, setLastClickedPost] = useState('');

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
											setIsModalActive={setIsModalActive}
											setLastClickedPost={setLastClickedPost}
										>
											<DashboardPublicPosts />
											<DashboardPrivatePosts />
										</Dashboard>
									}
								/>
							</Route>

							<Route path='/404' element={<Error />} />
							<Route path='/register' element={<RegisterForm />} />
							<Route path='/posts/:postid' element={<PostWrapper />} />
							<Route path='*' element={<Navigate to='/404' replace />} />
							<Route path='/login' element={<LoginForm setUser={setUser} />} />
							<Route
								path='/'
								element={
									<Home
										setIsModalActive={setIsModalActive}
										setLastClickedPostId={setLastClickedPost}
									/>
								}
							/>
						</Routes>

						<Modal
							isModalActive={isModalActive}
							lastClickedPostId={lastClickedPost}
							setIsModalActive={setIsModalActive}
						/>
					</PostsContextProvider>
				</AppLayout>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
