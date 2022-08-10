/* eslint-disable react/react-in-jsx-scope */
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App () {
  return (
    <>
    <Router>
      <div className='container'>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Dashboard></Dashboard>}/>
          <Route path='/login' element={<Login></Login>}/>
          <Route path='/register' element={<Register></Register>}/>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
