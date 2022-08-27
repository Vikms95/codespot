import React from 'react'
import { FaSignInAlt, FaUser, FaBook, FaTable, FaHouseUser, FaDoorOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logoutUser } from '../services/logoutUser'
import styled from 'styled-components'

const StyledNavbar = styled.nav`
  padding: 2em 2em ;
  color:  #531753;
  & > ul{
    padding-inline-start: 0;
    list-style:none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    row-gap: 2em;
    }
  `
const NavItem = styled.li`
    padding: 1em 2em;
    border-radius: 15px;
    & > a {
      padding-left: .4em;
      color:  #531753;
      font-size: 1em;
    }

    &:hover{
      background-color:#531753;
      color: white;
    }

    &:hover > a{
      background-color:#531753;
      color: white;
    }
  `

function Navbar () {
  return (
    <StyledNavbar>
      <ul>
        <NavItem>
          <FaHouseUser/>
          <Link to='/'>
          Home
            {' '}
          </Link>
        </NavItem>
        <NavItem>
          <FaTable/>
          <Link to='/dashboard'>
          Dashboard
            {' '}
          </Link>
        </NavItem>
        <NavItem>
            <FaBook/>
          <Link to='/create'>
          Create post
           {' '}
          </Link>
        </NavItem>
        <NavItem>
            <FaUser/>
          <Link to='/register'>
            Register
            {' '}
          </Link>
        </NavItem>
        <NavItem>
            <FaSignInAlt/>
          <Link to='/login'>
          Login
          {' '}
          </Link>
        </NavItem>
        <NavItem>
            <FaDoorOpen/>
          <Link to='/' onClick={logoutUser}>
            Logout
            {' '}
          </Link>
        </NavItem>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar
