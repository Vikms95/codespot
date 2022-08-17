/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Header from './components/Header'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import AuthRoute from './components/AuthRoute'
import AuthContext from './context/AuthContext'
import CreatePost from './components/CreatePost'

function App () {
  // Need to create state in app to pass it as value from the context provider?
  const [user, setUser] = useState()
  const authContext = { user, setUser }

  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <AuthContext.Provider value={authContext}>
            <Routes>
                <Route element={<AuthRoute/>}>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/create' element={<CreatePost/>}/>
                </Route>
              <Route path='/' element={<Home/>}/>
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
