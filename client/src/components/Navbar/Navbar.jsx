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

export function Navbar({ children }) {
	const { height, width } = useWindowDimensions();

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
