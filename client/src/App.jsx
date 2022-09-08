/* eslint-disable react/react-in-jsx-scope */
import './assets/global.css';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout } from './layouts';
import { AuthRouteWrapper } from './containers/AuthRouteWrapper';

import { AuthContext } from './context/AuthContext';
import { PostsContextProvider } from './context/PostsContext';

import { Home } from './components/Home';
import { Post } from './components/Post';
import { Modal } from './components/Modal';
import { Dashboard } from './components/Dashboard';
import { NavbarWithUser, NavbarWithGuest } from './components/Navbar';
import { LoginForm, RegisterForm, PostForm } from './components/Form';

import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	// Need to create state in app to pass it as value from the context provider?
	const [user, setUser] = useState();
	const [lastClickedPostId, setLastClickedPostId] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);

	const [posts, setPosts] = useLocalStorage('posts', []);

	const authContext = { user, setUser };
	console.log(posts);
	return (
		<Router>
			<AuthContext.Provider value={authContext}>
				{user ? <NavbarWithUser /> : <NavbarWithGuest />}

				<AppLayout>
					<PostsContextProvider posts={posts}>
						<Routes>
							<Route element={<AuthRouteWrapper />}>
								<Route path='/create' element={<PostForm />} />
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
							<Route path='/:postid' element={<Post setPosts={setPosts} />} />
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
