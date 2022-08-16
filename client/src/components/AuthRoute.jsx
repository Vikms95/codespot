/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import verifyUser from '../services/verifyUser'
import AuthContext from '../context/AuthContext'
import { Outlet } from 'react-router-dom'

// Component to wrap any component that is rendered after a protected route.
// It will call the verifyUser function to fetch the API for a response on whether the token is valid or not
// Then it does set the value to the component state and this one will set it to the context provider that will wrap
// the children of this component
function AuthRoute () {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [user, setUser] = useState('')
  useEffect(() => {
    verifyUser().then(authResult => {
      setIsAuth(!!authResult)
      setUser(authResult)
    })
  }, [])
  return (
    (isAuth && <Outlet context={ user }/>)
  )
}

export default AuthRoute
