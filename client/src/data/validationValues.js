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

const postVal = (fields) => { 
  return { 
    title: fields.title.length === 0,
    text: fields.text.length === 0,
  }
}

const commentVal = (fields) => { 
  return { 
    text: fields.text.length === 0,
  }
}



export {registerVal, loginVal, postVal, commentVal}