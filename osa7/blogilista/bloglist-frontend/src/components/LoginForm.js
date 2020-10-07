import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('text')

  const resetFields = () => {
    username.reset()
    password.reset()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      username: username.fieldProps.value,
      password: password.fieldProps.value,
    }
    dispatch(login(user))
    resetFields()
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.fieldProps} />
        </div>
        <div>
          password <input {...password.fieldProps} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
