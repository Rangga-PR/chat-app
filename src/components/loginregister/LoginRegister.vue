<template>
  <div class="wrapper">
    <div class="wrapper login">
      <login-form />
    </div>
    <div class="separator"></div>
    <div class="wrapper register">
      <register-form />
    </div>
  </div>
</template>

<script>
import LoginForm from "../loginform/LoginForm";
import RegisterForm from "../registerform/RegisterForm";

export default {
  name: "LoginRegister",
  components: {
    LoginForm,
    RegisterForm,
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.wrapper {
  display: flex;
  flex-direction: column-reverse;
}

.separator {
  margin: 1rem 0;
  width: 2px;
  height: 100%;
  background-color: $white;
}

.switcher {
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: 700;
  margin-top: 1rem;
  color: $white;
}

@media screen and(min-width: $mobile-breakpoints) {
  .wrapper {
    flex-direction: row;
  }

  .separator {
    margin: 0 6rem;
  }
}
</style>