<template>
  <div id="app">
    <login-form />
  </div>
</template>

<script>
import LoginForm from "./components/loginform/LoginForm";
export default {
  name: "App",
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
@import "./styles/_variables.scss";

#app {
  background-color: $blue;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
