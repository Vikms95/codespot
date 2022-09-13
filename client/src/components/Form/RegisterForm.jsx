import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFadeIn } from '../../hooks/useFadeIn';
import { registerFields } from '../../data/formFields';
import { createUser } from '../../services/user';
import { UserFormLayout } from '../../layouts/UserFormLayout';
import { useValidation } from '../../hooks/useValidation';
import { registerVal } from '../../data/validationValues';
import registerImage from '../../assets/register-image.webp';

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
	ServerErrorDisplay,
} from './_style';
import { useState } from 'react';

export function RegisterForm() {
	const navigate = useNavigate();
	const isActive = useFadeIn();
	const [serverError, setServerError] = useState('');

	const { formData, handleChange, handleBlur } = useForm(registerFields);
	const { isFormValid, shouldMarkErr } = useValidation(registerVal, formData);
	const { username, password, password2 } = formData;

	const handleSubmit = async e => {
		e.preventDefault();
		setServerError('');

		let data;
		try {
			data = await createUser(username, password, password2);
		} catch (err) {
			const message = err.message.split(':')[1];
			setServerError(message);
		}

		if (!data) return;

		return navigate('/login');
	};

	return (
		<UserFormLayout isActive={isActive}>
			<UserFormContainer>
				<UserForm onSubmit={handleSubmit} autoComplete='on'>
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
							Password must be 5 characters or longer{' '}
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
						autoComplete='on'
						maxLength={20}
						minLength={5}
						value={password2}
						onBlur={handleBlur}
						onChange={handleChange}
						shouldMarkError={shouldMarkErr('password2')}
					/>
					<ServerErrorDisplay serverError={serverError}>
						{serverError || 'No error'}
					</ServerErrorDisplay>
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
