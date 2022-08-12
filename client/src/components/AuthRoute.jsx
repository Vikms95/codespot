/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import verifyUser from '../services/verifyUser'
// import AuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

// Component to wrap any component that is rendered after a protected route.
// It will call the verifyUser function to fetch the API for a response on whether the token is valid or not
// Then it does set the value to the component state and this one will set it to the context provider that will wrap
// the children of this component
function AuthRoute () {
  const [isUserAuth, setIsUserAuth] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    verifyUser().then(authResult => {
      setIsUserAuth(!!authResult)
    })
  }, [isUserAuth])

  if (isUserAuth) return <Outlet/>
  else return <Navigate to='/login'></Navigate>
}

export default AuthRoute
