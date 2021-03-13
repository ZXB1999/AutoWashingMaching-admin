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
        <el-col :span="12"
          ><div class="imgsty">
            <img
              src="../../assets/logo.png"
              height="100"
              width="100"
              alt=""
            /></div
        ></el-col>
        <el-col :span="12"
          ><div class="imgsty">
            <img
              src="../../assets/logo/elementui.svg"
              height="100"
              width="100"
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
    };
  },
  methods: {
    login() {
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
            sessionStorage["access_token"] = res.data.access_token;
            this.$router.push("/homepage");
        })
        .catch(function () {
            alert("ERROR")
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