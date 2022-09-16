/* eslint-disable react/prop-types */
import React from 'react';
import { ModalWrapper } from '../../containers/ModalWrapper';
import { deletePost } from '../../services/post';
import { Button } from '../../style/Button';
import { StyledModal, ButtonContainer } from './_styles';

export function Modal(props) {
	const { setPosts, lastClickedPostId, setIsModalActive, isModalActive } =
		props;

	const handleDelete = async () => {
		const data = await deletePost(lastClickedPostId);
		if (!data) return;

		setPosts(prevPosts =>
			prevPosts.filter(post => post._id !== lastClickedPostId)
		);

		handleCancel();
	};

	const handleCancel = e => {
		setIsModalActive(false);
	};

	return (
		<ModalWrapper isModalActive={isModalActive} handleCancel={handleCancel}>
			<StyledModal onClick={e => e.stopPropagation()}>
				<p> Are you sure you want to delete this post? </p>
				<ButtonContainer>
					<Button onClick={handleCancel}> Cancel</Button>
					<Button onClick={handleDelete}> Delete</Button>
				</ButtonContainer>
			</StyledModal>
		</ModalWrapper>
	);
}
