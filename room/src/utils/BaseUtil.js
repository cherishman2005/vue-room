
/**
 * 设置 Cookie 值
 * @param {[String]} name [需要设置的 cookie 的 name]
 * @param {[String]} value [需要设置的 cookie 的 value]
 * @param {[Number]} Hours [需要设置的 cookie 的 有效时长（小时数），默认为 7 天]
 */
export function setCookie (name, value, Hours) {
  Hours = Hours || 168
  let d = new Date()
  let offset = 8
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
  let nd = utc + (3600000 * offset)
  let exp = new Date(nd)
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000)
  document.cookie = name + '=' + decodeURIComponent(value) + ';path=/;expires=' + exp.toGMTString() + ';'
}

/**
 * 获取 cookie 值
 * @param  {[String]} name [传入需要获取的 cookie 的 name]
 * @return {[String]}
 */
export function getCookie (name) {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) return encodeURIComponent(arr[2])
  return null
}


export function getStorage(key) {
  //return localStorage.getItem(key);
  return sessionStorage.getItem(key);
}

export function setStorage(key, value) {
  //return localStorage.setItem(key,value);
  return sessionStorage.setItem(key,value);
}

export function removeStorage() {
  //return localStorage.setItem(key, "");
  return sessionStorage.setItem(key, "");
}
