<template>
  <el-container style="height: 100vh">
    <common-aside></common-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";

export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>
