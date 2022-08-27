import React from 'react'
import { FaSignInAlt, FaUser, FaBook, FaTable, FaHouseUser, FaDoorOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logoutUser } from '../services/logoutUser'
import styled from 'styled-components'

const StyledNavbar = styled.nav`  
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  padding: 5em 2em ;
  max-width: 15em;

  & > ul{
    padding-inline-start: 0;
    list-style:none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    row-gap: 2em;
    }
  `
const NavItem = styled.li`
    display: flex;
    align-items: center;
    padding: .5em 4em;
    border-radius: 15px;
    padding: .5em 1.5em;
    color:  #531753;
    font-size: 1.4em;
    font-weight: 500;
    & > svg {
      padding-right: 1em;
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
        <Link to='/'>
        <NavItem>
            <FaHouseUser/>
            Home
              {' '}
          </NavItem>
        </Link>

          <Link to='/dashboard'>
        <NavItem>
          <FaTable/>
          Dashboard
            {' '}
        </NavItem>
          </Link>

          <Link to='/create'>
        <NavItem>
            <FaBook/>
          Create post
           {' '}
        </NavItem>
          </Link>

          <Link to='/register'>
        <NavItem>
            <FaUser/>
            Register
            {' '}
        </NavItem>
          </Link>

          <Link to='/login'>
        <NavItem>
            <FaSignInAlt/>
          Login
          {' '}
        </NavItem>
          </Link>

          <Link to='/' onClick={logoutUser}>
        <NavItem>
            <FaDoorOpen/>
            Logout
            {' '}
        </NavItem>
          </Link>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar
