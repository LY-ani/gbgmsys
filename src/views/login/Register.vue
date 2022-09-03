<template>
  <div class="con-reg">
    <div class="reg-container">
      <el-form
        :model="form"
        :rules="rules"
        status-icon
        ref="form"
        class="reg-form"
      >
        <i @click="backLogin" class="reg-back el-icon-arrow-left"></i>
        <h3 class="reg-title">注册新用户</h3>
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
        <el-form-item
          label="昵称"
          label-width="80px"
          prop="nickname"
          class="nickname"
        >
          <el-input
            type="input"
            v-model="form.nickname"
            auto-complete="off"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          label-width="80px"
          prop="email"
          class="email"
        >
          <el-input
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
          <!-- <el-upload
            action="http://localhost:3000/reguser"
            ref="uploadImg"
            :auto-upload="false"
            :data="form"
            :file-list="files"
            accept="image/*"
          >
            <el-button size="small">选择文件</el-button>
          </el-upload> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="img-box" v-if="src">
        <img class="reg-user-pic" :src="src" alt="" />
      </div>
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
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("电话号码格式不正确"));
        }
      }
    };
    return {
      // files: [],
      user_pic: "",
      form: {
        username: "",
        password: "",
        nickname: "",
        email: "",
        phone: "",
        powers: "普通职员",
        user_pic: null,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
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
      // 用来展示选中的图片s
      src: "",
    };
  },
  methods: {
    backLogin() {
      this.$router.push("/login");
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
      }
    },
    register() {
      const file = document.getElementById("inputFile").files[0];
      this.form.user_pic = file;
      // this.src = this.getObjectURL(file);
      // console.log("this.form", this.form);
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      // this.$refs.uploadImg.submit();
      // console.log("formData.user_pic", typeof formData.get("user_pic"));
      if (this.form.username && this.form.password) {
        this.axios({ url: "/api/reguser", method: "POST", data: formData })
          .then((res) => {
            if (res.data.status === 0) {
              this.$message({
                type: "success",
                message: res.data.message,
              });
              this.$router.push("/login");
            } else {
              this.$message.error(res.data.message);
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "用户名和密码不能为空！",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style>
.con-reg {
  position: relative;
  width: 100%;
  height: 100vh;
}
.reg-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  padding: 10px 35px 15px 35px;
  border-radius: 15px;
  box-shadow: 0 0 25px #c6c6c6;
}
.reg-back {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
}
.reg-form {
  width: 350px;
  text-align: center;
}
.con-reg .img-box {
  margin-top: 35px;
  margin-left: 35px;
  max-width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 25px #c6c6c6;
}
.reg-user-pic {
  display: block;
  height: 100%;
}
</style>