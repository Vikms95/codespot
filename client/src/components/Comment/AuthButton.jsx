/* eslint-disable react/prop-types */
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { IconButton, StyledFaTrash } from './_styles';

export function AuthButton({ handleDelete, setIsFormActive, isFormActive }) {
	return (
		<>
			<IconButton
				onClick={() => setIsFormActive(true)}
				isActive={isFormActive}
				aria-label={isFormActive ? 'Cancel edit' : 'Edit'}
			>
				<FaPen />
			</IconButton>
			<IconButton onClick={handleDelete}>
				<StyledFaTrash />
			</IconButton>
		</>
	);
}
