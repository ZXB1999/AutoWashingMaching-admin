<template>
  <div class="logbg">
    <div style="height: 4rem"></div>
    <div class="tit">
      <h1 style="margin-top: 0">欢迎使用AWM后台管理系统</h1>
    </div>
    <div style="height: 4rem"></div>
    <div class="login">
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <div style="height: 2rem"></div>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <div style="height: 2rem"></div>
      <el-button class="loginbtn" type="primary" @click="login">登陆</el-button>
    </div>
    <div class="logo">
      <el-row>
        <el-col :span="8"
          ><div class="imgsty">
            <img
              src="../../assets/logo.png"
              height="100"
              width="100"
              alt=""
            /></div
        ></el-col>
        <el-col :span="8"
          ><div class="imgsty">
            <img
              src="../../assets/logo/elementui.svg"
              height="100"
              width="100"
              alt=""
            /></div
        ></el-col>
        <el-col :span="8"
          ><div style="margin-top: 30px" class="imgsty">
            <img
              src="../../assets/logo/Echartslogo.png"
              height="36"
              width="160"
              alt=""
            /></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      authorities: "",
    };
  },
  methods: {
    login() {
      let that = this;
      this.axios
        .post(
          "/Login?client_id=" +
            "AWM_admin" +
            "&client_secret=" +
            "TTMY-ADMIN" +
            "&scope=" +
            "all" +
            "&grant_type=" +
            "password" +
            "&username=" +
            this.username +
            "&password=" +
            this.password
        )
        .then((res) => {
          localStorage.clear();
          this.axios
            .post("/Getusrmsg?token=" + res.data.access_token)
            .then((req) => {
              this.authorities = req.data.authorities[0];
              if (this.authorities === "ADMIN") {
                sessionStorage["access_token"] = res.data.access_token;
                this.$message({
                  type: "success",
                  message: "登陆成功",
                });
                this.$router.push("/homepage/main");
              } else {
                that.$message({
                  type: "error",
                  message: "您的账户没有权限",
                });
              }
            });
        })
        .catch(function () {
          that.$message({
            type: "error",
            message: "ERROR",
          });
        });
    },
  },
};
</script>
<style scoped>
.logbg {
  background-color: #b3d8ff;
  height: 100%;
}
.tit {
  margin: 0 auto;
  width: 500px;
}
.login {
  margin: 0 auto;
  width: 500px;
  height: 400px;
}
.loginbtn {
  width: 300px;
}
.logo {
  margin: 0 auto;
}
.imgsty {
  font-size: 20px;
  margin-left: 30px;
}
</style>