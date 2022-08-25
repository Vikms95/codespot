import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuthForm } from '../hooks/useAuthForm'
import { registerFields } from '../services/formFields'
import { userCreateOptions } from '../services/requestParams'

function RegisterForm () {
  const navigate = useNavigate()

  const { formData, handleChange } = useAuthForm(registerFields)
  const { username, password, password2 } = formData

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('/api/user',
      userCreateOptions('POST', { username, password, password2 })

    )
    return navigate('/login')
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser> Register </FaUser>
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" id='username' name='username' value={username} placeholder='Enter username' onChange={handleChange} />
          <input type="password" id='password' name='password' value={password} placeholder='Enter password' onChange={handleChange} />
          <input type="password" id='password2' name='password2' value={password2} placeholder='Repeat password' onChange={handleChange} />
          <button type='submit '> Register </button>
        </form>
      </section>
    </>
  )
}

export default RegisterForm
