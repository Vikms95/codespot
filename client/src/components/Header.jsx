import React from 'react'
import { FaSignInAlt, FaUser, FaBook, FaTable } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header () {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/dashboard'>
        My posts
          {' '}
        <FaTable/>
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/create'>
          Create post
           {' '}
            <FaBook/>
          </Link>
        </li>
        <li>
          <Link to='/login'>
          Login
          {' '}
            <FaSignInAlt/>
          </Link>
        </li>
        <li>
          <Link to='/register'>
            Register
            {' '}
            <FaUser/>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
