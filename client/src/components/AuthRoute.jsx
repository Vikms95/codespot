/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react'
import verifyUser from '../services/verifyUser'
import AuthContext from '../context/AuthContext'
import { Outlet } from 'react-router-dom'

// Component to wrap any component that is rendered after a protected route.
// It will call the verifyUser function to fetch the API for a response on whether the token is valid or not
// Then it does set the value to the component state and this one will set it to the context provider that will wrap
// the children of this component
function AuthRoute () {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    verifyUser()
      .then(authResult => {
        setUser(authResult.user)
      })
  }, [])

  return (
    (user && <Outlet/>)
  )
}

export default AuthRoute
