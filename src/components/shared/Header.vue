<template>
  <header>
    <ul>
      <router-link to="/" tag="li" exact>
        <a>Home</a>
      </router-link>
      <router-link to="/about" tag="li" exact>
        <a>About</a>
      </router-link>
      <router-link to="/login" tag="li" exact>
        <a>Login</a>
      </router-link>
      <router-link to="/register" tag="li" exact>
        <a>Register</a>
      </router-link>
    </ul>
    <p>Welcome user!</p>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header{
    display: flex;
    align-items: center;
}
ul {
  display: flex;
}
ul li {
  list-style: none;
  margin: 2rem;
  cursor: pointer;
}
</style>