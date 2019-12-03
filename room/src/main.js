// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import { getToken,setBeforeLoginUrl } from '@/utils/auth'
import { APPID, baseURL, redirectURL } from '@/global.js'
import { getStorage } from '@/utils/BaseUtil'

import './assets/css/chat.css'

Vue.use(ElementUI);
Vue.use(VueLazyload);

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

function getUdbAuth() {
  const appid = APPID;
  //const redirect_uri = encodeURIComponent(`${authURL}/author`);
  let redirect_uri = "http://www.test.com/room" + redirectURL;
  redirect_uri = encodeURIComponent(`${redirect_uri}`);

  const url = `https://os-lgn.yy.com/lgn/login/authorize.do?appid=${appid}&callback=${redirect_uri}&state=123456`;
  //alert("main href: " + url);
  window.location.href = url;
}

const whiteList = ['/author']

router.beforeEach((to, from, next) => {
  let uid = getStorage('uid');
  //alert('main uid: ' + uid);
  if (uid) {
    if (to.path === '/author') {
      next({ path: redirectURL });
    } else {
       next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //alert('xxx: ' + to.path)
      next()
    } else {
      //alert('fullPath: ' + to.fullPath)
      setBeforeLoginUrl(to.fullPath)
      next('/author');
      //getUdbAuth();
    }
  }
})

router.afterEach(() => {
})

Vue.config.productionTip = false;
Vue.use(MintUI)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
