import { userCreateOptions } from '../data/requestParams';

const createUser = async (username, password, password2) => {
  console.log("before check!")
	if (!username || !password || !password2) return;
  console.log("there are values!")
	try {
		const response = await fetch(
			'/api/user',
			userCreateOptions('POST', { username, password, password2 })
		);

		const data = await response.json();

		if (response.ok) {
			return data;
		}

		throw new Error(data.message);
	} catch (err) {
		console.error(err);
		throw new Error(err);
	}
};

const loginUser = async (username, password) => {
	if (!username || !password) return;

	try {
		const response = await fetch(
			'/api/session',
			userCreateOptions('POST', { username, password })
		);

		const data = await response.json();

		if (response.ok) {
			return data;
		}

		throw new Error(data.message);
	} catch (err) {
		console.error(err);
		throw new Error(err);
	}
};

const verifyUser = async () => {
	try {
		const response = await fetch('/api/session', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		});

		const data = await response.json();

		if (response.ok) {
			return data.user;
		} else {
			throw new Error(data.message);
		}
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
};

export { createUser, loginUser, verifyUser };
