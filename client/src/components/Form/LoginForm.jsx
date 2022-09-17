/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginFields } from '../../data/formFields';
import { loginUser } from '../../services/user';
import { setToStorage } from '../../utils/setToStorage';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { useFadeIn } from '../../hooks/useFadeIn';
import { loginVal } from '../../data/validationValues';
import { useValidation } from '../../hooks/useValidation';
import loginImage from '../../assets/login-image.webp';
import { getFromStorage } from '../../utils/getFromStorage';
import { Spinner } from '../../style/Spinner';

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
	ServerErrorDisplay,
} from './_styles';

export function LoginForm(props) {
	const { setUser } = props;
	const navigate = useNavigate();
	const isActive = useFadeIn();

	const { formData, handleChange, handleBlur } = useForm(loginFields);
	const { isFormValid, shouldMarkErr } = useValidation(loginVal, formData);
	const [serverError, setServerError] = useState('');
	const { username, password } = formData;

	const handleSubmit = async e => {
		e.preventDefault();
		setServerError('');

		let data;

		try {
			data = await loginUser(username, password);
		} catch (err) {
			const message = err.message.split(':')[1];
			setServerError(message);
		}

		if (!data) return;

		setUser(data.user);
		setToStorage('token', data.token);

		if (getFromStorage('postToRedirect')) {
			const postid = getFromStorage('postToRedirect');
			return navigate(`/posts/${postid}`);
		}

		return navigate('/dashboard');
	};

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={handleSubmit} autoComplete='on'>
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
						autoComplete='on'
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
						autoComplete='on'
						maxLength={20}
						minLength={5}
						value={password}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password')}
					/>
					<ServerErrorDisplay serverError={serverError}>
						{serverError || 'No error'}
					</ServerErrorDisplay>
					<LoginButton type='submit' disabled={isFormValid()}>
						{/* {' '} */}
						{/* Login */}
						<Spinner></Spinner>
					</LoginButton>
				</UserForm>
			</UserFormContainer>
			<FormImage src={loginImage}></FormImage>
		</UserFormLayout>
	);
}
