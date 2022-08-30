<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$router);
  },
};
</script>

<style>
@import "assets/css/base.css";
html,
body {
  margin: 0;
  padding: 0;
}
/* #app {
  height: 100vh;
} */
</style>