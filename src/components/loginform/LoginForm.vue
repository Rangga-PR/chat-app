<template>
  <form class="form-container">
    <input class="input" type="text" name="username" placeholder="Username" />
    <input class="input password" type="password" name="password" placeholder="Password" />
    <input class="btn login" type="submit" value="Sign In" />
  </form>
</template>

<script>
export default {
  name: "loginForm",
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

.login {
  font-weight: 700;
  margin-top: 1rem;
  background-color: $green;
}
</style>