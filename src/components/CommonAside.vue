<template>
  <el-menu
    :default-active="dActive"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 class="com-aside-hd">{{ isCollapse ? "后台" : "通用后台管理" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path.toString()"
      @click="clickMenu(item.path)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.path"
      :index="item.path.toString()"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="subItem in item.children"
          :key="subItem.path"
          :index="subItem.path.toString()"
          @click="clickMenu(subItem.path)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      dActive: "/home",
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
  mounted() {
    // console.log(menu);
  },
  methods: {
    clickMenu(path) {
      this.$router.push(path);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.com-aside-hd {
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 22px;
}
</style>