/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import PostForm from './components/PostForm'
import Post from './components/Post'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import AuthRouteWrapper from './containers/AuthRouteWrapper'
import AuthContext from './context/AuthContext'
import PostsContext from './context/PostsContext'
import Modal from './components/Modal'
import AppContainer from './style/AppContainer'
import { getFromStorage } from './services/getFromStorage'

function App () {
  // Need to create state in app to pass it as value from the context provider?
  const [user, setUser] = useState()
  const [posts, setPosts] = useState(getFromStorage('posts') || [])
  const [lastClickedPostId, setLastClickedPostId] = useState('')
  const [isModalActive, setIsModalActive] = useState(false)

  const authContext = { user, setUser }

  return (

      <Router>
        <AppContainer>
          <Navbar/>
          <AuthContext.Provider value={authContext}>
            <PostsContext.Provider value={{ posts }}>

            <Routes>

                <Route element={<AuthRouteWrapper/>}>
                  <Route
                    path='/dashboard'
                    element={
                      <Dashboard
                        posts={posts}
                        setPosts={setPosts}
                        lastClickedPostId={lastClickedPostId}
                        setLastClickedPostId={setLastClickedPostId}
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                      />}
                  />
                  <Route
                    path='/create'
                      element={<PostForm posts={posts}/>}/>
                  <Route
                    path='/update/:postid'
                      element={<PostForm posts={posts}/>}/>
                </Route>

              <Route
                path='/'
                element={
                  <Home
                    posts={posts}
                    setPosts={setPosts}
                    lastClickedPostId={lastClickedPostId}
                    setLastClickedPostId={setLastClickedPostId}
                    isModalActive={isModalActive}
                    setIsModalActive={setIsModalActive}
                  />}
                />
              <Route path='/login' element={<LoginForm setUser={setUser}/>}/>
              <Route path='/register' element={<RegisterForm/>}/>
              <Route path='/:postid' element={<Post posts={posts}/>}/>
            </Routes>

            </PostsContext.Provider>
          </AuthContext.Provider>

          <Modal
            setPosts={setPosts}
            lastClickedPostId={lastClickedPostId}
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
          />

        </AppContainer>
      </Router>

  )
}

export default App
