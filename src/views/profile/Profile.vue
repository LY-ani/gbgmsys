<template>
  <div class="profile">
    <el-form
      :model="form"
      :rules="rules"
      status-icon
      ref="form"
      class="pro-form"
      v-show="!showUpdate"
    >
      <el-form-item label="用户id" label-width="80px" prop="id" class="id">
        <el-input
          type="text"
          :disabled="true"
          v-model="form.id"
          auto-complete="off"
        ></el-input>
      </el-form-item>
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
          :disabled="true"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="昵称"
        label-width="80px"
        prop="nickname"
        class="nickname"
      >
        <el-input
          @change="checkUserInfo"
          type="input"
          v-model="form.nickname"
          auto-complete="off"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="职位"
        label-width="80px"
        prop="powers"
        class="powers"
      >
        <el-input
          @change="checkUserInfo"
          type="input"
          v-model="form.powers"
          auto-complete="off"
          placeholder="请选择职位"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email" class="email">
        <el-input
          @change="checkUserInfo"
          type="email"
          v-model="form.email"
          auto-complete="off"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        label-width="80px"
        prop="phone"
        class="phone"
      >
        <el-input
          @change="checkUserInfo"
          type="tel"
          v-model="form.phone"
          auto-complete="off"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="头像"
        label-width="80px"
        prop="user_pic"
        class="user_pic"
      >
        <el-input
          id="inputFile"
          type="file"
          accept="image/*"
          v-model="user_pic"
          @change="showImg"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          :disabled="!userInfoOk"
          @click="handleUserInfo"
        >
          修改个人信息
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="showUpdate = !showUpdate"
        >
          更改密码
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      :model="pForm"
      :rules="pRules"
      status-icon
      class="pwd-form"
      v-show="showUpdate"
    >
      <el-form-item label="旧密码" label-width="80px" prop="oldP">
        <el-input
          show-password
          v-model="pForm.oldP"
          auto-complete="off"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-width="80px" prop="newP">
        <el-input
          show-password
          v-model="pForm.newP"
          auto-complete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-width="80px" prop="checkP">
        <el-input
          show-password
          v-model="pForm.checkP"
          auto-complete="off"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          :disabled="!checkOk"
          @click="updatePwd"
          >更改密码</el-button
        >
        <el-button type="primary" size="small" @click="showUpdate = !showUpdate"
          >返回</el-button
        >
      </el-form-item>
    </el-form>
    <div class="r-box">
      <div class="img-box" v-if="src">
        <img class="user-pic" :src="src" alt="" />
      </div>
      <el-button
        type="primary"
        size="small"
        :disabled="!selectFile"
        @click="updateAvatar"
      >
        更换头像
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    //rule表示要验证的规则,value表示输入值,callback回调
    var checkEmail = (rule, value, callback) => {
      let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        //如果输入为空直接返回
        callback();
      } else {
        //如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
        if (mailReg.test(value)) {
          //匹配成功返回
          callback();
        } else {
          //匹配不成功返回错误显示
          callback(
            // this.$message.error(
            //   "邮箱格式:xx@xx.xx，只含数字、大小写字母、下划线、横杠"
            // )
            new Error("邮箱格式:xx@xx.xx，只含数字、大小写字母、下划线、横杠")
          );
        }
      }
    };
    // 自定义验证手机号
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }
    };
    var checkNew = (rule, value, callback) => {
      // 检查新旧密码是否相同
      if (value === this.pForm.newP) {
        this.checkOk = false;
        callback(new Error("旧密码与新密码一致，请更换新密码"));
      } else {
        this.checkOk = true;
        callback();
      }
    };
    var checkSame = (rule, value, callback) => {
      // 检查新旧密码是否相同
      if (value === this.pForm.oldP) {
        this.checkOk = false;
        callback(new Error("新密码与旧密码一致，请更换其他密码"));
      } else {
        callback();
      }
    };
    var checkPwd = (rule, value, callback) => {
      // 检查两个新密码是否一致
      if (this.pForm.newP !== value) {
        this.checkOk = false;
        callback(new Error("新密码不一致，请重新输入"));
      } else {
        this.checkOk = true;
      }
    };
    return {
      user: {},
      // 这个user_pic用来保存后端获取的用户信息的头像，是一个字符串
      // form表单里的user_pic要处理成File文件
      user_pic: "",
      form: {
        id: 1,
        username: "",
        nickname: "",
        email: "",
        powers: "",
        phone: "",
        user_pic: null,
      },
      rules: {
        username: [
          {
            min: 3,
            message: "用户名长度不能小于3位！",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
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
        nickname: [
          { max: 10, message: "昵称长度不能超过10位！", trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
      src: "",
      pForm: {
        oldP: "",
        newP: "",
        checkP: "",
      },
      pRules: {
        oldP: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
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
        newP: [
          { required: true, message: "请输入新密码", trigger: "blur" },
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
          { validator: checkSame, trigger: "blur" },
        ],
        checkP: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: checkPwd, trigger: "change" },
        ],
      },
      // 打开重置密码界面
      showUpdate: false,
      // 打开重置密码按钮
      checkOk: false,
      // 打开更新头像按钮
      selectFile: false,
      // 打开修改信息按钮
      userInfoOk: false,
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    updateAvatar() {
      this.$confirm("此操作将更换头像, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const file = document.getElementById("inputFile").files[0];
          this.form.user_pic = file;
          const formData = new FormData();
          formData.append("user_pic", this.form.user_pic);
          this.axios({ url: "/update/avatar", method: "POST", data: formData })
            .then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.$store.commit("getUser");
                this.user = this.$store.state.user.user;
                this.$store.commit("setUser", {
                  ...this.user,
                  user_pic: res.data.src,
                });
                this.$store.commit("getUser");
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更换",
          });
        });
    },
    updatePwd() {
      if (this.pForm.oldP && this.pForm.newP && this.pForm.checkP) {
        this.$confirm("此操作将更改密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.axios({
              url: "/update/password",
              method: "POST",
              data: { oldPwd: this.pForm.oldP, newPwd: this.pForm.newP },
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                // 更新成功
                this.pForm.oldP = "";
                this.pForm.newP = "";
                this.pForm.checkP = "";
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消更改",
            });
          });
      } else {
        this.$message.warning("密码不能为空");
      }
    },
    handleUserInfo() {
      // 修改用户信息
      this.$confirm("此操作将修改个人信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认修改，发送请求
          this.axios({
            url: "/update/userinfo",
            method: "POST",
            data: {
              id: this.form.id,
              username: this.form.username,
              nickname: this.form.nickname,
              email: this.form.email,
              phone: this.form.phone,
            },
          })
            .then((res) => {
              if (res.data.status === 0) {
                // 修改成功
                this.$store.commit("removeUser");
                this.$store.commit("setUser", {
                  ...this.user,
                  nickname: this.form.nickname,
                  email: this.form.email,
                  phone: this.form.phone,
                });
                // 重新加载用户信息
                this.getUserInfo();
                this.$message.success(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    getUserInfo() {
      this.$store.commit("getUser");
      this.user = this.$store.state.user.user;
      this.form.id = this.user.id;
      this.form.username = this.user.username;
      this.form.nickname = this.user.nickname;
      this.form.email = this.user.email;
      this.form.powers = this.user.powers;
      this.form.phone = this.user.phone;
      this.src = this.user.user_pic;
    },
    checkUserInfo() {
      // 检测个人信息是否被修改
      if (this.form.nickname !== this.user.nickname) {
        console.log(this.form.nickname);
        this.userInfoOk = true;
        return;
      } else if (this.form.email !== this.user.email) {
        this.userInfoOk = true;
        return;
      } else if (this.form.phone !== this.user.phone) {
        this.userInfoOk = true;
        return;
      } else {
        this.userInfoOk = false;
      }
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    showImg() {
      const file = document.getElementById("inputFile").files[0];
      if (file) {
        this.src = this.getObjectURL(file);
        this.selectFile = true;
      }
    },
  },
};
</script>

<style>
.profile {
  position: relative;
  display: flex;
  width: 100%;
}
.pro-form {
  width: 50%;
  min-width: 280px;
}
.pwd-form {
  width: 50%;
  min-width: 280px;
}
.profile .r-box {
  margin-left: 35px;
}
.profile .img-box {
  margin-bottom: 18px;
  width: 420px;
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 25px #c6c6c6;
}
.user-pic {
  display: block;

  /* width: 100%;
  height: 100%; */
}
</style>