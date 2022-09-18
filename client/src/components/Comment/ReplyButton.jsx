/* eslint-disable react/prop-types */
import React from 'react';
import { FaReply } from 'react-icons/fa';
import { IconButton } from './_styles';

export function ReplyButton({ isFormActive, setIsFormActive }) {
	return (
		<IconButton
			onClick={() => {
				setIsFormActive(true);
			}}
			isActive={isFormActive}
			aria-label={isFormActive ? 'Cancel reply' : 'Reply'}
		>
			<FaReply />
		</IconButton>
	);
}
