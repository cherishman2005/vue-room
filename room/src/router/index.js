import Vue from 'vue'
import Router from 'vue-router'

const author = resolve => require(['@/components/login/author'], resolve)
const error = resolve => require(['@/page/error.vue'], resolve)
const chat = resolve => require(['@/components/chatroom/chat.vue'], resolve)
const chat_test = resolve => require(['@/components/chatroom/chat_test.vue'], resolve)
const chat_svc = resolve => require(['@/components/chatroom/chat_svc.vue'], resolve)
const im = resolve => require(['@/components/im/im.vue'], resolve)
const im_test = resolve => require(['@/components/im/im_test.vue'], resolve)
const im_perf = resolve => require(['@/components/im/im_perf.vue'], resolve)

const signal_test = resolve => require(['@/components/signal/signal_test.vue'], resolve)
const signal = resolve => require(['@/components/signal/signal.vue'], resolve)

const rts_test = resolve => require(['@/components/rts/rts_test.vue'], resolve)

const table = resolve => require(['@/components/rts/table.vue'], resolve)

Vue.use(Router);
const routes = [
  {path: '*', component: error},
  {path: '/author', component: author, name: "author" },
  {path: '/chat', component: chat, name: "chat" },
  {path: '/chat-test', component: chat_test, name: "chat-test" },
  {path: '/chat-svc', component: chat_svc, name: "chat-svc" },
  {path: '/im', component: im, name: "im" },
  {path: '/im-test', component: im_test, name: "im-test" },
  {path: '/im-perf', component: im_perf, name: "im-perf" },
  {path: '/signal-test', component: signal_test, name: "signal-test" },
  {path: '/signal', component: signal, name: "signal" },
  {path: '/rts-test', component: rts_test, name: "rts-test" },
  {path: '/table', component: table, name: "table" },
];

const router = new Router({
  mode: 'history',
  base: '/room/',
  scrollBehavior: () => ({y: 0}),
  routes: routes,
});
export default router;

