<template>
  <div id="app">
    <app-header :key="$route.fullPath"></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/shared/Header.vue";

export default {
  components: {
    appHeader: Header,
  }
};
</script>

<style>
body {
  background: url("/images/background2.jpg");
  background-attachment: fixed;
  
  
}
#app {
  box-sizing: border-box;
  margin-left: 6rem;
  font-family: Helvetica, sans-sarif;
 
}
.loader {
  border: 16px solid #c0c7cf; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
