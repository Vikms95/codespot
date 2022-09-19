/* eslint-disable react/prop-types */
import React from 'react';
import PostPreview from './PostPreview';
import { useNavigate } from 'react-router-dom';
import { PostButtonContainer } from './_styles';
import { Button } from '../../style/Button';

export default function PostPreviewWithButtons(
	{ id, setIsModalActive, setLastClickedPostId },
	{ ...props }
) {
	const navigate = useNavigate();

	const handleUpdate = () => {
		return navigate('/update/' + id);
	};

	const revealDeleteModal = () => {
		setIsModalActive(true);
		setLastClickedPostId(id);
	};

	return (
		<PostPreview {...props}>
			<PostButtonContainer>
				<Button onClick={handleUpdate}>Update</Button>
				<Button onClick={revealDeleteModal}>Delete</Button>
			</PostButtonContainer>
		</PostPreview>
	);
}
