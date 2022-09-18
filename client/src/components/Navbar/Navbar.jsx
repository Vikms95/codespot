/* eslint react/prop-types: 0 */
import React from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { FaHouseUser } from 'react-icons/fa';

import {
	InnerNav,
	NavArrow,
	NavItem,
	StyledLink,
	StyledNavbar,
	TitleText,
} from './_styles';
import { useAuth } from '../../hooks/useAuth';

export function Navbar({ children }) {
	const { width } = useWindowDimensions();
	useAuth();
	return (
		<StyledNavbar>
			<InnerNav>
				<StyledLink to='/'>
					<NavItem>
						{width > 600 ? (
							<>
								<TitleText> CODESPOT </TitleText>
								<NavArrow />
							</>
						) : (
							<FaHouseUser />
						)}
					</NavItem>
				</StyledLink>
				{children}
			</InnerNav>
		</StyledNavbar>
	);
}
