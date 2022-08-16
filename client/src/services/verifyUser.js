const verifyUser = async () => {
  const response = await fetch('/api/verify', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  const user = await response.json()
  if (response.statusCode === 403) {
    return null
  } else {
    return user
  }
}

export default verifyUser
