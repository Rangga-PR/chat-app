<template>
  <div id="app">
    <!-- <h1 class="app-title">Chat App</h1>
    <login-register />-->
    <chat />
  </div>
</template>

<script>
import LoginRegister from "./components/loginregister/LoginRegister";
import Chat from "./components/chat/Chat";

export default {
  name: "App",
  components: {
    LoginRegister,
    Chat,
  },
};
</script>

<style lang="scss">
@import "./styles/_variables.scss";

#app {
  background-color: $blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .app-title {
    color: $white;
    font-size: 3rem;
    text-decoration: underline;
    margin-top: 0;
  }
}
</style>
