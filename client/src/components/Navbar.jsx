import React, { useState } from 'react';
import {
	FaSignInAlt,
	FaUser,
	FaBook,
	FaTable,
	FaHouseUser,
	FaDoorOpen,
	FaBars,
	FaArrowLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logoutUser } from '../services/logoutUser';
import styled from 'styled-components';

const LinkText = styled.span`
  display: none;
`

const StyledNavbar = styled.nav`
  background-color: white;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
	padding: 5em 0;
	width: 7em;
	height: 100%;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
  transition: width 200ms ease;
  z-index: 100;
  
  &:hover {
    width:16rem;
  }
  &:hover ${LinkText} {
    display: block;
  }
`;

const InnerNav = styled.ul`
	padding-inline-start: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	row-gap: 2em;

  > * {
    &:last-child{
      margin-top: 25rem;
    }
  }

`;
const ToggleButton = styled.button`
	border: none;
	background-color: transparent;
	font-size: 1.4em;
	padding: 0 1em;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	border-radius: 10px;
	color: #6649b8;
	font-size: 1.5em;
	font-weight: 500;
  width: 100%;
  filter: grayscale(100%) opacity(.7);
  transition: filter 600ms;

	& > svg {
		width: 2rem;
    margin-right: 1rem;
	}

	&:hover {
    filter: grayscale(0%) opacity(1);
	}
`;


function Navbar() {

	return (
		<>
			<StyledNavbar

			>
				<InnerNav>
					<Link to='/'>
						<NavItem>
							<FaHouseUser />
              <LinkText> Home </LinkText>
						</NavItem>
					</Link>

					<Link to='/dashboard'>
						<NavItem>
							<FaTable />
							<LinkText> Dashboard </LinkText>
						</NavItem>
					</Link>

					<Link to='/create'>
						<NavItem>
							<FaBook />
							<LinkText> New post </LinkText>
						</NavItem>
					</Link>

					<Link to='/register'>
						<NavItem>
							<FaUser />
							<LinkText> Register </LinkText>
						</NavItem>
					</Link>

					<Link to='/login'>
						<NavItem>
							<FaSignInAlt />
							<LinkText> Login </LinkText>
						</NavItem>
					</Link>

					<Link to='/' onClick={logoutUser}>
						<NavItem>
							<FaDoorOpen />
							<LinkText> Logout </LinkText>
						</NavItem>
					</Link>
				</InnerNav>
			</StyledNavbar>
		</>
	);
}

export default Navbar;
