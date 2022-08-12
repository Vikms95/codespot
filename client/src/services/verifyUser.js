const verifyUser = async () => {
  const response = await fetch('/api/verify', {
    method: 'GET',
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
  const user = await response.json()
  console.log(user)
  return user
}

export default verifyUser
