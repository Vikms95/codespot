/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { commentFields } from '../../data/formFields';
import AuthContext from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Button } from '../../style/Button';
import { createComment } from '../../services/createComment';

const StyledCommentForm = styled.form`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 1em;
	margin: 5em 0;
`;

const StyledCommentInput = styled.textarea`
	border-radius: 15px;
	resize: none;
	min-width: 50em;
	min-height: 10em;
	padding: 2em;
	padding-right: 15em;
	outline: 1px solid #6649b8;

	&::-webkit-scrollbar {
		width: 0.75rem;
	}

	&::-webkit-scrollbar-track {
		background: rgb(255, 255, 255);
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: #6649b8;
		border-radius: 10px;
	}
`;

const CommentFormButton = styled(Button)`
	position: absolute;
	bottom: 10%;
	right: 3%;
`;

export function CommentForm(props) {
	const { postid, setComments, parentid, autofocus = false } = props;
	const { user: userid } = useContext(AuthContext);
	const { formData, setFormData, handleChange } = useForm(commentFields);
	const { text } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const comment = await createComment(text, postid, userid, parentid);

		setComments(prevComments => [...prevComments, comment]);
		setFormData(commentFields);
	};

	return (
		<StyledCommentForm onSubmit={handleSubmit}>
			<StyledCommentInput
				autoFocus={autofocus}
				type='text'
				name='text'
				value={text}
				onChange={handleChange}
			/>
			<CommentFormButton type='submit'>
				{' '}
				{parentid ? 'Reply' : 'Comment'}{' '}
			</CommentFormButton>
		</StyledCommentForm>
	);
}
