const registerVal = (fields) => { 
  return { 
    username: fields.username.length === 0,
    password: fields.password.length <= 4,
    password2: fields.password2.length <= 4 || fields.password !== fields.password2
  }
}

const loginVal = (fields) => { 
  return { 
    username: fields.username.length === 0,
    password: fields.password.length <= 4,
  }
}



export {registerVal, loginVal}