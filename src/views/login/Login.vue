<template>
  <div class="con-login">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      ref="form"
      class="login-container"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        class="password"
      >
        <el-input
          show-password
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <span class="regNew" @click="regNew">注册新用户</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          // { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位！",
            trigger: "blur",
          },
        ],
        password: [
          // { required: true, message: "请输入密码", trigger: "blur" },
          {
            max: 16,
            message: "密码长度不能超过16位！",
            trigger: "blur",
          },
          {
            min: 6,
            message: "用户名长度不能小于6位！",
            trigger: "blur",
          },
        ],
      },
      token: "",
    };
  },
  methods: {
    regNew() {
      this.$router.push("/register");
    },
    async login() {
      if (this.form.username && this.form.password) {
        await this.axios({ url: "/api/login", method: "POST", data: this.form })
          .then((res) => {
            if (res.data && res.data.status === 0) {
              this.token = res.data.token;
              this.$store.commit("setToken", this.token);
            }
            if (res.data && res.data.status !== 0) {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        await this.axios("/getMenu")
          .then((res) => {
            if (res.data.status === 0) {
              this.$store.commit("removeMenu");
              this.$store.commit("setMenu", res.data.menu);
              this.$store.commit("addMenu", this.$router);
              this.$router.push("/home");
              console.log(this.$router);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "用户名和密码不能为空",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
.con-login {
  position: relative;
  width: 100%;
  height: 100vh;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  padding: 10px 35px 15px 35px;
  width: 350px;
  border-radius: 15px;
  box-shadow: 0 0 25px #c6c6c6;
  text-align: center;
}
.regNew {
  position: absolute;
  right: 10px;
  font-size: 14px;
  color: #c6c6c6;
  cursor: pointer;
}
.regNew:hover {
  text-decoration: underline;
}
</style>