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

import { AuthContext } from './context/AuthContext';
import { PostsContextProvider } from './context/PostsContext';

import { Home } from './components/Home';
import { Modal } from './components/Modal';
import { Error } from './components/Error';
import { Dashboard } from './components/Dashboard';
import { NavbarWithUser, NavbarWithGuest } from './components/Navbar';
import { LoginForm, RegisterForm, PostForm } from './components/Form';

import { useLocalStorage } from './hooks/useLocalStorage';
import PostProvider from './containers/PostWrapper';

function App() {
	// Need to create state in app to pass it as value from the context provider?
	const [user, setUser] = useState();
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [lastClickedPostId, setLastClickedPostId] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);

	return (
		<Router>
			<AuthContext.Provider value={{ user, setUser }}>
				{user ? <NavbarWithUser /> : <NavbarWithGuest />}

				<AppLayout>
					<PostsContextProvider value={{ posts, setPosts }}>
						<Routes>
							<Route element={<AuthRouteWrapper />}>
								<Route
									path='/create'
									element={<PostForm setPosts={setPosts} />}
								/>
								<Route path='/update/:postid' element={<PostForm />} />
								<Route
									path='/dashboard'
									element={
										<Dashboard
											setPosts={setPosts}
											isModalActive={isModalActive}
											lastClickedPostId={lastClickedPostId}
											setIsModalActive={setIsModalActive}
											setLastClickedPostId={setLastClickedPostId}
										/>
									}
								/>
							</Route>

							<Route path='/login' element={<LoginForm setUser={setUser} />} />
							<Route path='/register' element={<RegisterForm />} />
							<Route
								path='/posts/:postid'
								element={<PostProvider setPosts={setPosts} />}
							/>
							<Route
								path='/'
								element={
									<Home
										setPosts={setPosts}
										isModalActive={isModalActive}
										lastClickedPostId={lastClickedPostId}
										setIsModalActive={setIsModalActive}
										setLastClickedPostId={setLastClickedPostId}
									/>
								}
							/>
							<Route path='/404' element={<Error />} />
							<Route path='*' element={<Navigate to='/404' replace />} />
						</Routes>
					</PostsContextProvider>

					<Modal
						setPosts={setPosts}
						isModalActive={isModalActive}
						lastClickedPostId={lastClickedPostId}
						setIsModalActive={setIsModalActive}
					/>
				</AppLayout>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
