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

function forgot (email) {
  return post(`/api/forgot`, { email })
}

function reset (token, password, passwordConfirm) {
  return post(`/api/reset/${token}`, {
    password,
    'password-confirm': passwordConfirm
  })
}

export { login, register, check, forgot, reset }
