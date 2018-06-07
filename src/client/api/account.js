import { post } from './requests'

function login (email, password) {
  return post(`/api/login`, {
    email,
    password
  })
}

function register (username, email, password, passwordConfirm) {
  return post(`/api/register`, {
    username,
    email,
    password,
    'password-confirm': passwordConfirm
  })
}

export { login, register }
