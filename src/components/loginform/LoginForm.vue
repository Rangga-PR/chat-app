<template>
  <form class="form-container" @submit.prevent="signIn">
    <input v-model="username" class="input" type="text" name="username" placeholder="Username" />
    <input
      v-model="password"
      class="input password"
      type="password"
      name="password"
      placeholder="Password"
    />
    <input class="btn login" type="submit" value="Sign In" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "loginForm",
  data() {
    return {
      username: "",
      password: "",
      report: "",
    };
  },
  methods: {
    signIn: function() {
      axios
        .post(`${process.env.SERVER_URL}/signin`, {
          username: this.username,
          password: this.password,
        })
        .then(res => {
          localStorage.setItem("chatAppUser", res.data.result.username);
          this.report = res.data.message;
          this.$emit("loginStatus", this.report, "success");
        })
        .catch(err => {
          if (err.response) this.report = err.response.data.message;
          this.$emit("loginStatus", this.report, "failure");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.form-container {
  display: flex;
  flex-direction: column;
}

.input {
  border: none;
  height: 1.5rem;
  padding: 5px;
  border-radius: 3px;
  color: $black;
}

.password {
  margin-top: 0.4rem;
}

.btn {
  text-decoration: none;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 0.5rem 1.5rem;
}

.login {
  font-weight: 700;
  margin-top: 1rem;
  background-color: $green;
}
</style>
