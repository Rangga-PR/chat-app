<template>
  <div class="container">
    <h1 class="app-title">Chat App</h1>
    <div class="wrapper">
      <div class="status" :class="reportStatus">{{report}}</div>
      <div class="wrapper login">
        <login-form @loginStatus="setReport" />
      </div>
      <div class="separator"></div>
      <div class="wrapper register">
        <register-form @registerStatus="setReport" />
      </div>
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
  data() {
    return {
      report: "",
      reportStatus: "",
    };
  },
  methods: {
    setReport: function(report, status) {
      this.report = report;
      this.reportStatus = status;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.container {
  display: flex;
  flex-direction: column;
}

.wrapper {
  position: relative;
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

.app-title {
  color: $white;
  font-size: 3rem;
  text-decoration: underline;
  margin-top: 0;
}

.status {
  opacity: 0;
  position: absolute;
  width: 100%;
  color: white;
  font-weight: 700;
  bottom: -10vh;
  padding: 0.5rem 0;
  border-radius: 3px;
  transition: ease-in 0.7s;
}

.success {
  opacity: 1;
  background-color: $green;
}

.failure {
  opacity: 1;
  background-color: salmon;
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