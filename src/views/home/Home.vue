<template>
  <div class="con-home">
    Home
    <el-button @click="handle">测试</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handle() {
      // this.axios({ url: "/update/aaa", method: "POST" })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.$store.commit("getUser");
    },
  },
};
</script>

<style>
</style>