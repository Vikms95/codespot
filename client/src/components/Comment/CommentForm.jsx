import React from 'react';
import styled from 'styled-components';
import { commentFields } from '../../services/formFields';
import { useForm } from '../../hooks/useForm';
import { userCreateOptions } from '../../services/requestParams';
import { Button } from '../../style/Button';

const StyledCommentForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 1em;
`;

const StyledCommentInput = styled.textarea`
	border-radius: 5px;
	resize: none;
	min-width: 60em;
	min-height: 10em;
	padding: 2em;
`;
export function CommentForm() {
	const { formData, handleChange } = useForm(commentFields);
	const { text } = formData;

	const handleSubmit = async e => {
		e.preventDefault();
		const response = await fetch(
			'/api/comment',
			userCreateOptions('POST', { formData })
		);
	};

	return (
		<StyledCommentForm onSubmit={handleSubmit}>
			<StyledCommentInput
				type='text'
				name='text'
				value={text}
				onChange={handleChange}
			/>
			<Button type='submit'> Publish comment </Button>
		</StyledCommentForm>
	);
}
