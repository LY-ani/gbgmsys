<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabs"
          :key="item.path"
          :to="{ path: item.path }"
        >
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="pic-box">
          <img :src="src" alt="" class="user-pic" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="clickProfile">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: {},
      src: "",
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    ...mapState({
      tabs: (state) => state.tab.tabsList,
      auth: (state) => state.user.user,
    }),
  },
  watch: {
    auth() {
      this.$store.commit("getUser");
      this.src = this.auth.user_pic;
    },
  },
  methods: {
    clickProfile() {
      this.$store.commit("selectMenu", {
        name: "Profile",
        label: "个人中心",
        path: "/profile",
      });
      this.$router.push("/profile");
    },
    logOut() {
      this.$store.commit("removeToken");
      this.$store.commit("clearMenu");
      this.$store.commit("removeUser");
      this.$store.commit("clearTabs");
      this.$router.push("/login");
    },
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    getUser() {
      this.axios({ url: "/getUser" })
        .then((res) => {
          if (res.data.status === 0) {
            this.user = res.data.user;
            this.src = this.user.user_pic;
            this.$store.commit("removeUser");
            this.$store.commit("setUser", this.user);
            // console.log(this.user);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
header {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
}
.l-content {
  display: flex;
  align-items: center;
}
.l-content .el-button {
  margin-right: 20px;
}
.pic-box {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
}
.user-pic {
  display: block;
  height: 100%;
}
/* 面包屑 */
.l-content .el-breadcrumb__inner {
  color: #aaa !important;
}
</style>