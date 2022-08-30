<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="pic-box">
          <img :src="src" alt="" class="user-pic" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
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
  methods: {
    logOut() {
      this.$store.commit("removeToken");
      this.$store.commit("removeMenu");
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
</style>