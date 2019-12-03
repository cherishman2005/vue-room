import Vue from 'vue'
import Router from 'vue-router'

const author = resolve => require(['@/components/login/author'], resolve)
const error = resolve => require(['@/page/error.vue'], resolve)
const chat = resolve => require(['@/components/chat.vue'], resolve)
const chat_test = resolve => require(['@/components/chat_test.vue'], resolve)
const chat_perf = resolve => require(['@/components/chat_perf.vue'], resolve)
const im = resolve => require(['@/components/im.vue'], resolve)
const im_test = resolve => require(['@/components/im_test.vue'], resolve)
const im_perf = resolve => require(['@/components/im_perf.vue'], resolve)

const signal_test = resolve => require(['@/components/signal_test.vue'], resolve)
const signal = resolve => require(['@/components/signal.vue'], resolve)

const channel_test = resolve => require(['@/components/channel_test.vue'], resolve)

Vue.use(Router);
const routes = [
  {path: '*', component: error},
  {path: '/author', component: author, name: "author" },
  {path: '/chat', component: chat, name: "chat" },
  {path: '/chat-test', component: chat_test, name: "chat-test" },
  {path: '/chat-perf', component: chat_perf, name: "chat-perf" },
  {path: '/im', component: im, name: "im" },
  {path: '/im-test', component: im_test, name: "im-test" },
  {path: '/im-perf', component: im_perf, name: "im-perf" },
  {path: '/signal-test', component: signal_test, name: "signal-test" },
  {path: '/signal', component: signal, name: "signal" },
  {path: '/channel-test', component: channel_test, name: "channel-test" },
];

const router = new Router({
  mode: 'history',
  base: '/room/',
  scrollBehavior: () => ({y: 0}),
  routes: routes,
});
export default router;

