
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

export function Uint8ArrayToString(fileData) {
  let dataString = "";
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
}

export function stringToUint8Array(str) {
  let arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  let tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}


export function padMs(ms) {
  let len = ms.toString().length;
  switch (len) {
    case 1:
      return '00' + ms;
    case 2:
      return '0' + ms;
    default:
      return  ms.toString();
  }
}

const DEMO_TAG = "rts-demo"
// 通过rts-demo，给测试看的日志/回调日志
export function log4test(info, ext) {
  let date = new Date();
  let timestamp = date.toLocaleTimeString('en-US', { hour12: false}) + "." + padMs(date.getMilliseconds())
  console.log(`${DEMO_TAG} ${timestamp} : ${info} ` + (ext ? JSON.stringify(ext) : ""))
}

export function generateDataInKB(unit) {
  let contentList = []
  let size = (unit * 1024) / 4
  for (let i = 0; i < size; i++) {
    // 4个字节，utf16
    contentList.push("测试")
  };
  let value = contentList.join("")
  return value
}

export function generateAttributes(size, postfix = "") {
  let res = {}
  for(let i = 0; i< size; i++) {
    res[`key${i}`] = `value${i}_${postfix}`
  }
  return res
}

export function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}
