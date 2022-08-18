/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Header from './components/Header'
import PostForm from './components/PostForm'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AuthRouteContainer from './containers/AuthRouteContainer'
import AuthContext from './context/AuthContext'

function App () {
  // Need to create state in app to pass it as value from the context provider?
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [lastClickedPostId, setLastClickedPostId] = useState('')
  const authContext = { user, setUser }

  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <AuthContext.Provider value={authContext}>
            <Routes>
                <Route element={<AuthRouteContainer/>}>
                  <Route
                    path='/dashboard'
                    element={
                      <Dashboard
                        posts={posts}
                        setPosts={setPosts}
                        lastClickedPostId={lastClickedPostId}
                        setLastClickedPostId={setLastClickedPostId}
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
                  />}
                />
              <Route path='/login' element={<Login setUser={setUser}/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </AuthContext.Provider>
        </div>
      </Router>
    </>
  )
}

export default App
