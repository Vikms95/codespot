import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../services/logoutUser';
import styled from 'styled-components';
import {
	FaSignInAlt,
	FaUser,
	FaBook,
	FaTable,
	FaHouseUser,
	FaDoorOpen,
  FaChevronRight
} from 'react-icons/fa';

const LinkText = styled.span`
  display: none;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const NavArrow = styled(FaChevronRight)`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  width: 100%;
  margin-top: .5em;
  color:#4f29b6;
  width: 100%;
  margin-left: .5em;

  & > svg {
    filter: grayscale(0%);
    color:#4f29b6;
    transform: rotate(0deg);
    transition: transform 300ms;
  }
`

const InnerNav = styled.ul`
	padding-inline-start: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	row-gap: 2em;
  width: 100%;

  > * {
    &:last-child{
      margin-top: 20rem;
    }
  }

  > * {
    &:first-child{
      background-color: #dcdcdc;
    }
  }

`;

const StyledNavbar = styled.nav`
  background-color: white;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
	padding: 1em 0;
	width: 7em;
	height: 100%;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
  transition: width 200ms ease;
  z-index: 100;
  
  
  &:hover {
    width:16rem;
  }

  &:hover ${NavArrow} {
    transform: rotate(-180deg) translateX(-2rem);

  }

  &:hover ${LinkText} {
    display: block;
  }


`;

const NavItem = styled.li`
	display: flex;
  justify-content: center;
	align-items: center;
	color: #6649b8;
	font-size: 1.5em;
	font-weight: 500;
  filter: grayscale(100%) opacity(.7);
  transition: filter 400ms;
  width: 100%;

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
			<StyledNavbar>
				<InnerNav>

          <NavItem>
            <LinkText> BLOGSPOT </LinkText>
            <NavArrow/>
          </NavItem>

					<StyledLink to='/'>
						<NavItem>
							<FaHouseUser />
              <LinkText> Home </LinkText>
						</NavItem>
					</StyledLink>

					<StyledLink to='/dashboard'>
						<NavItem>
							<FaTable />
							<LinkText> Dashboard </LinkText>
						</NavItem>
					</StyledLink>

					<StyledLink to='/create'>
						<NavItem>
							<FaBook />
							<LinkText> New post </LinkText>
						</NavItem>
					</StyledLink>

					<StyledLink to='/register'>
						<NavItem>
							<FaUser />
							<LinkText> Register </LinkText>
						</NavItem>
					</StyledLink>

					<StyledLink to='/login'>
						<NavItem>
							<FaSignInAlt />
							<LinkText> Login </LinkText>
						</NavItem>
					</StyledLink>

					<StyledLink to='/' onClick={logoutUser}>
						<NavItem>
							<FaDoorOpen />
							<LinkText> Logout </LinkText>
						</NavItem>
					</StyledLink>
				</InnerNav>
			</StyledNavbar>
		</>
	);
}

export default Navbar;
