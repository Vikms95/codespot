/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginFields } from '../../data/formFields';
import { loginUser } from '../../services/loginUser';
import { setToStorage } from '../../utils/setToStorage';
import loginImage from '../../assets/login-image.webp';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { Button } from '../../style/Button';
import { Label } from '../../style/Label';
import { useFadeIn } from '../../hooks/useFadeIn';

const UserFormContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
	height: 60%;
	width: 100%;
	padding: 3em 10em;
	border-radius: 10px;
`;

const UserForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1em;
	align-items: center;
`;

const HeroTitle = styled.h1`
	font-weight: 100;
	font-size: 2em;
`;

const StyledLabel = styled(Label)`
	align-self: flex-start;
	font-weight: 400;
`;

const Input = styled.input`
	text-align: center;
	border: none;
	outline: 1px solid transparent;
	background-color: #f5f1f1;
	border-radius: 5px;
	padding: 0.6em 6em;
	font-size: 1.2em;
	box-shadow: inset 10 0 2px #000;

	&:focus {
		outline: 1px solid #6649b8;
	}
`;

const FormImage = styled.img`
	height: max(20em, 30vw);
	width: auto;
`;

const LoginButton = styled(Button)`
	padding: 0.8em 4em;
	font-weight: bolder;
	margin-top: 2em;
`;

export function LoginForm(props) {
	const { setUser } = props;
	const navigate = useNavigate();
	const isActive = useFadeIn();

	const { formData, handleChange } = useForm(loginFields);
	const { username, password } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const data = await loginUser(username, password);

		setUser(data.user);
		setToStorage('token', data.token);

		return navigate('/dashboard');
	};

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={handleSubmit}>
					<HeroTitle> Share your ideas with the world.</HeroTitle>
					<StyledLabel htmlFor='username'> Username </StyledLabel>
					<Input
						type='text'
						id='username'
						name='username'
						value={username}
						onChange={handleChange}
					/>
					<StyledLabel htmlFor='password'> Password </StyledLabel>
					<Input
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
					<LoginButton type='submit '> Login </LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={loginImage}></FormImage>
		</UserFormLayout>
	);
}
