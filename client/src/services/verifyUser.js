const verifyUser = async () => {
  const response = await fetch('/api/session', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })

  const user = await response.json()

  if (response.status === 403) {
    return null
  } else {
    return user
  }
}

export default verifyUser
