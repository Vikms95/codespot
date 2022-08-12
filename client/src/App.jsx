/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AuthRoute from './components/AuthRoute'

function App () {
  return (
    <>
        <Router>
          <div className='container'>
            <Header/>
            <Routes>
                <Route element={<AuthRoute/>}>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                </Route>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
        </Router>
    </>
  )
}

export default App
