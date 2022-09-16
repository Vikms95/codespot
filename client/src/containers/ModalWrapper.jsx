/* eslint-disable react/prop-types */
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { StyledModalWrapper } from './_styles';

/**
 * Handles the logic on whether the modal should be rendered
 * and when rendered, wraps it on an invisible, full screen div
 * to make any element behind unclickable. If that div ever gets
 * clicked, change isModalActive prop to false.
 */
export function ModalWrapper(props) {
	const { children, isModalActive, handleCancel } = props;
	const { isActive } = useFadeIn();

	return (
		isModalActive && (
			<StyledModalWrapper onClick={handleCancel} isActive={isActive}>
				{children}
			</StyledModalWrapper>
		)
	);
}
