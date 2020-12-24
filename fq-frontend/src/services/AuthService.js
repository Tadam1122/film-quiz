import store from '../store/index'
import { http } from './HttpService'
import jwt from 'jsonwebtoken'

export function isLoggedIn() {
  const token = localStorage.getItem('token')
  return token != null
}

export function login(user) {
  return http()
    .post('/auth', user)
    .then((res) => {
      if (res) {
        setToken(res.data.token)
      }
    })
    .catch(function(error) {
      if (error.response) {
        return error.response
      }
    })
}

export function logout() {
  localStorage.clear()
  store.dispatch('authenticate')
}

export function setToken(token) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate')
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getUsername() {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.username
}

export function getUserId() {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.id
}

export function isAdmin() {
  const token = decodeToken()
  if (!token) {
    return false
  }
  return token.user.isAdmin
}

export function isHost() {
  const token = decodeToken()
  if (!token) {
    return false
  }
  return token.user.isHost
}

export function getPin() {
  const token = decodeToken()
  if (!token) {
    return false
  }
  return token.user.pin
}

export function registerUser(user) {
  return http()
    .post('/register', user)
    .catch(function(error) {
      if (error.response) {
        return error.response
      }
    })
}

function decodeToken() {
  const token = getToken()
  if (!token) {
    return null
  }
  return jwt.decode(token)
}
