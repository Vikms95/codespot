import React from 'react'
import { FaSignInAlt, FaUser, FaBook, FaTable, FaHouseUser, FaDoorOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logoutUser } from '../services/logoutUser'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  margin: 0 10em ;
  & > ul{
    list-style:none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    }
  `
const NavItem = styled.li`
  `

function Navbar () {
  return (
    <StyledNavbar>
      <ul>
        <NavItem>
          <Link to='/'>
          Home
            {' '}
          <FaHouseUser/>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/dashboard'>
          Dashboard
            {' '}
          <FaTable/>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/create'>
          Create post
           {' '}
            <FaBook/>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/register'>
            Register
            {' '}
            <FaUser/>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/login'>
          Login
          {' '}
            <FaSignInAlt/>
          </Link>
        </NavItem>
        <NavItem>
          <Link to='/' onClick={logoutUser}>
            Logout
            {' '}
            <FaDoorOpen/>
          </Link>
        </NavItem>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar
