/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AuthRoute from './components/AuthRoute'
import AuthContext from './context/AuthContext'
import { useState } from 'react'
import CreatePost from './components/CreatePost'

function App () {
  const [isAuth, setIsAuth] = useState(false)
  const authContext = { isAuth, setIsAuth }

  return (
    <>
        <Router>
          <div className='container'>
            <Header/>
            <Routes>

                <Route element=
                {
                  <AuthContext.Provider value={authContext}>
                    <AuthRoute/>
                  </AuthContext.Provider>
                }>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/create' element={<CreatePost/>}/>
                </Route>

              <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
              <Route path='/register' element={<Register/>}/>

            </Routes>
          </div>
        </Router>
    </>
  )
}

export default App
