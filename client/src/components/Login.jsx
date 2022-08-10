import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login () {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt> Login </FaSignInAlt>
        </h1>
        <p>Please create an account</p>
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
