import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFadeIn } from '../../hooks/useFadeIn';
import { registerFields } from '../../data/formFields';
import { createUser } from '../../services/user';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import registerImage from '../../assets/register-image.webp';
import { useValidation } from '../../hooks/useValidation';
import { registerVal } from '../../data/validationValues';

import {
	UserFormContainer,
	UserForm,
	StyledLabel,
	InputHeader,
	ErrorMessage,
	Input,
	LoginButton,
	FormImage,
	HeroTitle,
} from './_style';

export function RegisterForm() {
	const navigate = useNavigate();
	const isActive = useFadeIn();

	const { formData, handleChange, handleBlur } = useForm(registerFields);
	const { isFormValid, shouldMarkErr } = useValidation(registerVal, formData);
	const { username, password, password2 } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const data = await createUser(username, password, password2);
		if (!data) return;

		return navigate('/login');
	};

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={handleSubmit}>
					<HeroTitle> Connect with the world ideas.</HeroTitle>
					<InputHeader>
						<StyledLabel htmlFor='username'> Username </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
							Username is required
						</ErrorMessage>
					</InputHeader>
					<Input
						type='text'
						id='username'
						name='username'
						maxLength={20}
						minLength={1}
						value={username}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('username')}
					/>
					<InputHeader>
						<StyledLabel htmlFor='password'> Password </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('password')}>
							{' '}
							Password must be 5 characters or longer{' '}
						</ErrorMessage>
					</InputHeader>
					<Input
						type='password'
						id='password'
						name='password'
						maxLength={20}
						minLength={5}
						value={password}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password')}
					/>
					<InputHeader>
						<StyledLabel htmlFor='password'> Confirm password </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('password2')}>
							Passwords should match
						</ErrorMessage>
					</InputHeader>
					<Input
						type='password'
						id='password2'
						name='password2'
						maxLength={20}
						minLength={5}
						value={password2}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password2')}
					/>
					<LoginButton type='submit' disabled={isFormValid()}>
						{' '}
						Register{' '}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={registerImage}></FormImage>
		</UserFormLayout>
	);
}
