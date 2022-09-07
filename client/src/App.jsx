/* eslint-disable react/react-in-jsx-scope */
import './assets/global.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import PostForm from './components/Post/PostForm';
import Post from './components/Post/Post';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import AuthRouteWrapper from './containers/AuthRouteWrapper';
import { PostsContextProvider } from './context/PostsContext';
import AuthContext from './context/AuthContext';
import Modal from './components/Modal';
import AppContainer from './layouts/AppLayout';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	// Need to create state in app to pass it as value from the context provider?
	const [user, setUser] = useState();
	const [posts, setPosts] = useLocalStorage('posts', []);

	const [lastClickedPostId, setLastClickedPostId] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);

	const authContext = { user, setUser };

	return (
		<Router>
			<Navbar />
			<AppContainer>
				<AuthContext.Provider value={authContext}>
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
				</AuthContext.Provider>

				<Modal
					setPosts={setPosts}
					isModalActive={isModalActive}
					lastClickedPostId={lastClickedPostId}
					setIsModalActive={setIsModalActive}
				/>
			</AppContainer>
		</Router>
	);
}

export default App;
