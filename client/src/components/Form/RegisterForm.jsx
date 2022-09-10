import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFadeIn } from '../../hooks/useFadeIn';
import { registerFields } from '../../data/formFields';
import { createUser } from '../../services/user';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import registerImage from '../../assets/register-image.webp';

import {
	UserFormContainer,
	UserForm,
	StyledLabel,
	Input,
	LoginButton,
	FormImage,
	HeroTitle,
} from './_style';

export function RegisterForm() {
	const navigate = useNavigate();
	const isActive = useFadeIn();
	const { formData, handleChange, handleBlur } = useForm(registerFields);
	const { username, password, password2 } = formData;

	const handleValidation = (username, password, password2) => {
		return {
			username: username.length === 0,
			password: password.length <= 4 || password !== password2,
			password2: password2.length <= 4 || password2 !== password,
		};
	};

	const isFormValid = () => Object.keys(errors).some(field => errors[field]);

	const errors = handleValidation(username, password, password2);

	const shouldMarkError = field => {
		const hasError = errors[field];
		const shouldShow = formData.touched[field];
		return hasError ? shouldShow : false;
	};

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
					<StyledLabel htmlFor='username'> Username </StyledLabel>
					<Input
						type='text'
						id='username'
						name='username'
						maxLength={20}
						minLength={1}
						value={username}
						onChange={handleChange}
						onBlur={handleBlur}
						shouldMarkError={shouldMarkError('username')}
					/>
					<StyledLabel htmlFor='password'> Password </StyledLabel>
					<Input
						type='password'
						id='password'
						name='password'
						maxLength={20}
						minLength={5}
						value={password}
						onChange={handleChange}
						onBlur={handleBlur}
						shouldMarkError={shouldMarkError('password')}
					/>
					<StyledLabel htmlFor='password'> Confirm password </StyledLabel>
					<Input
						type='password'
						id='password2'
						name='password2'
						maxLength={20}
						minLength={5}
						value={password2}
						onChange={handleChange}
						onBlur={handleBlur}
						shouldMarkError={shouldMarkError('password2')}
					/>
					<LoginButton type='submit' disabled={isFormValid}>
						{' '}
						Register{' '}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={registerImage}></FormImage>
		</UserFormLayout>
	);
}
