import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
//  console.log('getToken='+Cookies.get(TokenKey))
  //alert("getToken="+JSON.stringify(sessionStorage.getItem(TokenKey)))
  //return Cookies.get(TokenKey)
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  //alert("setToken = " + token)
  //return Cookies.set(TokenKey, token)
  return sessionStorage.setItem(TokenKey,token);
}

export function removeToken() {
  //return Cookies.remove(TokenKey)
  return sessionStorage.setItem(TokenKey,"");
}


export function getStorage(key) {
  return sessionStorage.getItem(key);
}

export function setStorage(key, value) {
  return sessionStorage.setItem(key,value);
}

export function removeStorage() {
  return sessionStorage.setItem(key, "");
}

const beforeLoginUrlKey = 'beforeLoginUrl'

export function getBeforeLoginUrl() {
  return sessionStorage.getItem(beforeLoginUrlKey);
}

export function setBeforeLoginUrl(url) {
  return sessionStorage.setItem(beforeLoginUrlKey,url);
}

export function removeBeforeLoginUrl() {
  return sessionStorage.setItem(beforeLoginUrlKey,"");
}

export function getCount() {
  return sessionStorage.getItem('count');
}

export function setCount(val) {
  return sessionStorage.setItem('count', val);
}
