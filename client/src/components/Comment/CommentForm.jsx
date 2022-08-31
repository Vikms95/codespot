/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { commentFields } from '../../data/formFields';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../style/Button';
import { createComment } from '../../services/createComment';

const StyledCommentForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 1em;
	margin: 5em 0;
`;

const StyledCommentInput = styled.textarea`
	border-radius: 5px;
	resize: none;
	min-width: 60em;
	min-height: 10em;
	padding: 2em;
`;
export function CommentForm(props) {
	const { postid, setComments } = props;
	const { user: userid } = useAuth();
	const { formData, handleChange } = useForm(commentFields);
	const { text } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const comment = await createComment(text, postid, userid);

		setComments(prevComments => [...prevComments, comment]);
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
