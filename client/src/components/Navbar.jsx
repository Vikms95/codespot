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
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledNavbar = styled(motion.nav)`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	padding: 5em 1em;
	max-width: 15em;
	height: 100%;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
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
const ToggleButton = styled(motion.button)`
	border: none;
	background-color: transparent;
	font-size: 1.4em;
	padding: 0 1em;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	padding: 0.5em 4em;
	border-radius: 10px;
	padding: 0.5em 1.5em;
	color: #531753;
	font-size: 1.4em;
	font-weight: 500;

	& > svg {
		padding-right: 1em;
	}

	&:hover {
		background-color: #531753;
		color: white;
	}

	&:hover > a {
		background-color: #531753;
		color: white;
	}
`;
const variants = {
	open: { opacity: 0, x: 0 },
	closed: { opacity: 0, x: '-100%' },
};

function Navbar() {
	const [show, setShow] = useState(false);

	return (
		<StyledNavbar
			animate={show ? 'open' : 'close'}
			variants={variants}
			transition={{ duration: 0.5 }}
		>
			<ToggleButton
				className='toggle'
				onClick={() => setShow(prevShow => !prevShow)}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				{show ? <FaArrowLeft></FaArrowLeft> : <FaBars></FaBars>}
			</ToggleButton>

			<InnerNav>
				<Link to='/'>
					<NavItem>
						<FaHouseUser />
						Home{' '}
					</NavItem>
				</Link>

				<Link to='/dashboard'>
					<NavItem>
						<FaTable />
						Dashboard{' '}
					</NavItem>
				</Link>

				<Link to='/create'>
					<NavItem>
						<FaBook />
						Create post{' '}
					</NavItem>
				</Link>

				<Link to='/register'>
					<NavItem>
						<FaUser />
						Register{' '}
					</NavItem>
				</Link>

				<Link to='/login'>
					<NavItem>
						<FaSignInAlt />
						Login{' '}
					</NavItem>
				</Link>

				<Link to='/' onClick={logoutUser}>
					<NavItem>
						<FaDoorOpen />
						Logout{' '}
					</NavItem>
				</Link>
			</InnerNav>
		</StyledNavbar>
	);
}

export default Navbar;
