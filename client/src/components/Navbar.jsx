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

	& > svg {
		min-width: 1rem;
    margin-right: 1rem;
	}

	&:hover {
		background-color: #6649b8;
		color: white;
	}

	&:hover > a {
		background-color: #6649b8;
		color: white;
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
