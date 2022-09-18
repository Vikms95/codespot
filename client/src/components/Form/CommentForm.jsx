/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { commentFields } from '../../data/formFields';
import { useValidation } from '../../hooks/useValidation';
import { commentVal } from '../../data/validationValues';
import {
	StyledCommentInput,
	StyledCommentForm,
	CommentInputButtons,
	CommentFormButton,
} from './_styles';

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

	const { user: userid } = useAuthContext();
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
