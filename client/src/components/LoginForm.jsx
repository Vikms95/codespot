/* eslint-disable react/prop-types */
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { loginFields } from '../services/formFields';
import { userCreateOptions } from '../services/requestParams';
import { setToStorage } from '../services/setToStorage';

function LoginForm(props) {
	const { setUser } = props;
	const navigate = useNavigate();

	const { formData, handleChange } = useForm(loginFields);
	const { username, password } = formData;

	const handleSubmit = async e => {
		e.preventDefault();

		const response = await fetch(
			'/api/session',
			userCreateOptions('POST', { username, password })
		);
		const data = await response.json();

		setToStorage('token', data.token);
		setUser(data.user);

		return navigate('/dashboard');
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt> Login </FaSignInAlt>
				</h1>
				<p>Please login</p>
			</section>

			<section className='form'>
				<form action='' onSubmit={handleSubmit}>
					<input
						type='text'
						id='username'
						name='username'
						value={username}
						placeholder='Enter username'
						onChange={handleChange}
					/>
					<input
						type='password'
						id='password'
						name='password'
						value={password}
						placeholder='Enter password'
						onChange={handleChange}
					/>
					<button type='submit '> Login </button>
				</form>
			</section>
		</>
	);
}

export default LoginForm;
