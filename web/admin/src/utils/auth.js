import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserName = 'user'
const UserName1 = 'user1'

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setName(name) {
  return Cookies.set(UserName, name)
}

export function getName() {
  return Cookies.get(UserName)
}

export function setName1(name) {
  return Cookies.set(UserName1, name)
}

export function getName1() {
  return Cookies.get(UserName1)
}


export function removeName() {
  return Cookies.remove(UserName)
}