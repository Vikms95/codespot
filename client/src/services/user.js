import { userCreateOptions } from "../data/requestParams";

const createUser = async (username, password, password2) => {
  if(!username || !password || !password2) return

  try{

    const response = await fetch('/api/user',
      userCreateOptions('POST', { username, password, password2 })
    );


    const data = await response.json()
    console.log(data)
    return data

  } catch(err) {
    throw new Error(err)
  }
}

const loginUser = async (username, password) => {
  if(!username || !password ) return

  try{

    const response = await fetch('/api/session',
    userCreateOptions('POST', { username, password })
    );

    const data = await response.json();
    
    return data

  } catch(err) {
    throw new Error(err)
  }
}

const verifyUser = async () => {
  
  try{
    const response = await fetch('/api/session', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    const data = await response.json();
    
    return data.user;
    
  } catch(err) {
    return new Error(err)
  }

  
};

export {
  createUser,
  loginUser,
  verifyUser
}