import { userCreateOptions } from "../data/requestParams";

const createUser = (username, password, password2) => {
  fetch('/api/user',
    userCreateOptions('POST', { username, password, password2 })
  );
}

const loginUser = async (username, password) => {
  
  const response = await fetch('/api/session',
    userCreateOptions('POST', { username, password })
  );
  const data = await response.json();

  return data
}

const verifyUser = async () => {
	const response = await fetch('/api/session', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});

	const user = await response.json();

	if (response.status === 403) {
		return null;
	} else {
		return user;
	}
};

export {
  createUser,
  loginUser,
  verifyUser
}