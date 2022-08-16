/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Login (props) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
  const { setIsAuth } = props

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    const token = await response.json()
    localStorage.setItem('token', JSON.stringify(token))

    setIsAuth(true)

    return navigate('/dashboard')
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt> Login </FaSignInAlt>
        </h1>
        <p>Please login</p>
      </section>

      <section className='form'>
        <form action="" onSubmit={onSubmit}>
          <input type="text" id='username' name='username' value={username} placeholder='Enter username' onChange={onChange} />
          <input type="password" id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
          <button type='submit '> Login </button>
        </form>
      </section>
    </>
  )
}

export default Login
