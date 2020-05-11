<template>
  <form class="form-container" @submit.prevent="signUp">
    <input v-model="username" class="input" type="text" name="username" placeholder="Username" />
    <input
      v-model="password"
      class="input password"
      type="password"
      name="password"
      placeholder="Password"
    />
    <input class="btn register" type="submit" value="Sign Up" />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: "",
      report: "",
    };
  },
  methods: {
    signUp: function() {
      axios
        .post(`${process.env.SERVER_URL}/signup`, {
          username: this.username,
          password: this.password,
        })
        .then(res => {
          this.report = res.data.message;
          this.$emit("registerStatus", this.report, "success");
        })
        .catch(err => {
          if (err.response) this.report = err.response.data.message;
          this.$emit("registerStatus", this.report, "failure");
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

.register {
  font-weight: 700;
  margin-top: 1rem;
  background-color: $yellow;
}
</style>
