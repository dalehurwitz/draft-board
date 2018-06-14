import { get, post } from './requests'

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

function check (authToken) {
  return get(`/api/check`, authToken)
}

export { login, register, check }
