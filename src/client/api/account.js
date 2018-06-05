import { post } from './requests'

function register (username, email, password, passwordConfirm) {
  return post(`/api/register`, {
    username,
    email,
    password,
    'password-confirm': passwordConfirm
  })
}

export { register }
