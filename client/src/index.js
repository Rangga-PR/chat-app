import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Chat from "./components/chat/Chat.vue";
import LoginRegister from "./components/loginregister/LoginRegister.vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import "./styles/main.scss";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(process.env.CHAT_SERVER_URL),
  })
);

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "login", component: LoginRegister },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    props: { chatTitle: "Chat Room" },
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem("chatAppUser");
      if (user) next();
      else router.push({ path: "/" });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
