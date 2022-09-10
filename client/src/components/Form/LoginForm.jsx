/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginFields } from '../../data/formFields';
import { loginUser } from '../../services/user';
import { setToStorage } from '../../utils/setToStorage';
import loginImage from '../../assets/login-image.webp';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { Button } from '../../style/Button';
import { Label } from '../../style/Label';
import { useFadeIn } from '../../hooks/useFadeIn';
import { loginVal } from '../../data/validationValues';
import { useValidation } from '../../hooks/useValidation';
import {
	UserFormContainer,
	UserForm,
	HeroTitle,
	StyledLabel,
	Input,
	InputHeader,
	LoginButton,
	FormImage,
	ErrorMessage,
} from './_style';

export function LoginForm(props) {
	const { setUser } = props;
	const navigate = useNavigate();
	const isActive = useFadeIn();

	const { formData, handleChange, handleBlur } = useForm(loginFields);
	const { isFormValid, shouldMarkErr } = useValidation(loginVal, formData);
	const { username, password } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const data = await loginUser(username, password);
		if (!data) return;

		setUser(data.user);
		setToStorage('token', data.token);

		return navigate('/dashboard');
	};

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={handleSubmit}>
					<HeroTitle> Share your ideas with the world.</HeroTitle>
					<InputHeader>
						<StyledLabel htmlFor='username'> Username </StyledLabel>
						<ErrorMessage shouldMarkError={shouldMarkErr('username')}>
							{' '}
							Username is required{' '}
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
							Password is required{' '}
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
					<LoginButton type='submit' disabled={isFormValid()}>
						{' '}
						Login{' '}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={loginImage}></FormImage>
		</UserFormLayout>
	);
}
