/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Button } from '../../style/Button';
import { commentFields } from '../../data/formFields';
import { useValidation } from '../../hooks/useValidation';
import { commentVal } from '../../data/validationValues';

const StyledCommentForm = styled.form`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: ${props => (props.isCommentForm ? 'flex-start' : 'center')};
	row-gap: 1em;
	margin: 1em 3em;
	width: ${props => (props.isCommentForm ? 'none' : '70%')};
	outline: 1px solid #6649b8;
	border-radius: 15px;

	&:focus-within {
		outline: 2px solid #6649b8;
	}
`;

const StyledCommentInput = styled.textarea`
	resize: none;
	min-width: 90%;
	min-height: 10em;
	padding: 2em;
	outline: none;
	border: none;

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
	bottom: 10%;
	right: 19%;

	&:active ${StyledCommentForm} {
		outline: 1px solid #6649b8;
	}

	background-color: ${props => props.disabled && 'grey'};
	color: ${props => props.disabled && 'white'};
	&:hover {
		${props => props.disabled && 'filter: none; cursor:default;'}
	}
`;

const CommentInputButtons = styled.div`
	display: flex;
	justify-content: flex-end;
	align-self: flex-end;
	gap: 2em;
	padding: 1em 2em;
`;

export function CommentForm(props) {
	const {
		type,
		initialValue,
		commentid,
		autofocus,
		isCommentForm,
		setIsFormActive,
		handleCommentSubmit,
		handleCommentUpdate,
	} = props;

	const { user: userid } = useContext(AuthContext);
	const { formData, setFormData, handleChange } = useForm(commentFields);
	const { isFormValid } = useValidation(commentVal, formData);
	const { text } = formData;

	const checkFormFunctionality = type => {
		switch (type) {
			case 'reply':
				return 'Reply';
			case 'edit':
				return 'Edit';
			default:
				return 'Comment';
		}
	};

	useEffect(() => {
		if (type === 'edit') {
			setFormData(prevFormData => ({
				...prevFormData,
				text: initialValue,
			}));
		}
	}, [initialValue]);

	return (
		<StyledCommentForm
			isCommentForm={isCommentForm}
			autoFocus={autofocus}
			tabIndex='1'
			onSubmit={e => {
				type === 'edit'
					? handleCommentUpdate(e, setFormData, text, userid, commentid)
					: handleCommentSubmit(e, setFormData, text, userid, commentid);
			}}
		>
			<StyledCommentInput
				type='text'
				name='text'
				value={text}
				onChange={handleChange}
				maxLength={3000}
				placeholder='What are your thoughts?'
			/>

			<CommentInputButtons>
				{isCommentForm && (
					<CommentFormButton onClick={() => setIsFormActive(false)}>
						Cancel
					</CommentFormButton>
				)}

				<CommentFormButton type='submit' disabled={isFormValid()}>
					{' '}
					{checkFormFunctionality(type)}
				</CommentFormButton>
			</CommentInputButtons>
		</StyledCommentForm>
	);
}
