import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFadeIn } from '../../hooks/useFadeIn';
import { registerFields } from '../../data/formFields';
import { createUser } from '../../services/user';
import styled from 'styled-components';
import { Label } from '../../style/Label';
import { Button } from '../../style/Button';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import registerImage from '../../assets/register-image.webp';
import { validatePassword } from '../../utils/validateInput';

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

const LoginButton = styled(Button)`
	padding: 0.8em 4em;
	font-weight: bolder;
	margin-top: 2em;

	background-color: ${props => props.disabled && 'grey'};
	color: ${props => props.disabled && 'white'};
	&:hover {
		${props => props.disabled && 'filter: none; cursor:default;'}
	}

`;

const Input = styled.input`
	background-color: #f5f1f1;
	box-shadow: inset 10 0 2px #000;
	border: none;
	border-radius: 5px;
	font-size: 1.2em;
	text-align: center;
	padding: 0.6em 6em;

	outline: ${props =>
		props.errors[props.name] ? '1px solid red' : '1px solid transparent'};

	&:focus {
		outline: 1px solid #6649b8;
	}

	&:blur {
	}
`;

const FormImage = styled.img`
	height: max(20em, 30vw);
	width: auto;
`;

export function RegisterForm() {
	const navigate = useNavigate();
	const isActive = useFadeIn();
	const { formData, handleChange } = useForm(registerFields);
	const { username, password, password2 } = formData;

	const handleValidation = (username, password, password2) => {
		return (
			username.length === 0 && password.length <= 4 && password2.length <= 4
		);
	};

	const errors = handleValidation(username, password, password2);

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
						value={username}
						onChange={handleChange}
						maxLength={20}
						errors={errors}
					/>
					<StyledLabel htmlFor='password'> Password </StyledLabel>
					<Input
						type='password'
						id='password'
						name='password'
						onChange={handleChange}
						maxLength={20}
						minLength={5}
						value={password}
						errors={errors}
					/>
					<StyledLabel htmlFor='password'> Confirm password </StyledLabel>
					<Input
						type='password'
						id='password2'
						name='password2'
						onChange={handleChange}
						value={password2}
						maxLength={20}
						minLength={5}
						errors={errors}
					/>
					<LoginButton
						type='submit'
						disabled={!Object.keys(errors).some(x => errors[x])}
					>
						{' '}
						Register{' '}
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={registerImage}></FormImage>
		</UserFormLayout>
	);
}
