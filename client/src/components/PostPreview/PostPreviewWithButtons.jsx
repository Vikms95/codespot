/* eslint-disable react/prop-types */
import React from 'react';
import PostPreview from './PostPreview';
import { useNavigate } from 'react-router-dom';
import { PostButtonContainer } from './_styles';
import { Button } from '../../style/Button';

export default function PostPreviewWithButtons(props) {
	const { id, setIsModalActive, setLastClickedPost } = props;
	const navigate = useNavigate();

	const handleUpdate = () => {
		return navigate('/update/' + id);
	};

	const revealDeleteModal = () => {
		setIsModalActive(true);
		setLastClickedPost(id);
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
