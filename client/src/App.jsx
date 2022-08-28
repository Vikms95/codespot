/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import PostForm from './components/PostForm';
import Post from './components/Post';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import AuthRouteWrapper from './containers/AuthRouteWrapper';
import { PostsContextProvider } from './context/PostsContext';
import AuthContext from './context/AuthContext';
import Modal from './components/Modal';
import AppContainer from './style/AppContainer';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
	// Need to create state in app to pass it as value from the context provider?
	const [user, setUser] = useState();
	const [posts, setPosts] = useLocalStorage('posts', []);
	const [lastClickedPostId, setLastClickedPostId] = useState('');
	const [isModalActive, setIsModalActive] = useState(false);

	const authContext = { user, setUser };
	const postsContext = { posts, setPosts };

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
											isModalActive={isModalActive}
											lastClickedPostId={lastClickedPostId}
											setPosts={setPosts}
											setIsModalActive={setIsModalActive}
											setLastClickedPostId={setLastClickedPostId}
										/>
									}
								/>
							</Route>

							<Route path='/login' element={<LoginForm setUser={setUser} />} />
							<Route path='/register' element={<RegisterForm />} />
							<Route path='/:postid' element={<Post />} />
							<Route
								path='/'
								element={
									<Home
										isModalActive={isModalActive}
										lastClickedPostId={lastClickedPostId}
										setPosts={setPosts}
										setIsModalActive={setIsModalActive}
										setLastClickedPostId={setLastClickedPostId}
									/>
								}
							/>
						</Routes>
					</PostsContextProvider>
				</AuthContext.Provider>

				<Modal
					isModalActive={isModalActive}
					lastClickedPostId={lastClickedPostId}
					setPosts={setPosts}
					setIsModalActive={setIsModalActive}
				/>
			</AppContainer>
		</Router>
	);
}

export default App;
