/* eslint-disable react/prop-types */
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginFields } from '../../data/formFields';
import { loginUser } from '../../services/loginUser';
import { setToStorage } from '../../utils/setToStorage';

export function LoginForm(props) {
	const { setUser } = props;
	const navigate = useNavigate();

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
