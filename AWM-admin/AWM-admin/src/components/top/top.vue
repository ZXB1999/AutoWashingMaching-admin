<template>
  <div id="top">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/homepage/main" @click="tomain">首页</el-menu-item>
      <el-menu-item index="/homepage/machineMap" @click="tomap"
        >设备分布</el-menu-item
      >
      <el-menu-item index="/homepage/messagehub" @click="tomsg">消息中心</el-menu-item>
      <span class="name"
        >欢迎使用AutoWashingMachie-自助洗衣系统后台管理系统</span
      >
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="sysaccountto">账户</el-dropdown-item>
          <el-dropdown-item @click.native="systo">系统</el-dropdown-item>
          <!-- 父组件想在子组件上监听自己的click的话，需要加上native修饰符 -->
          <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="name">{{username}}</span>
    </el-menu>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: null
    };
  },
  created() {
    this.axios
      .post("/Getusrmsg?token=" + sessionStorage.getItem("access_token"))
      .then((req)=>(this.username=req.data.user_name));
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout() {
      this.axios
        .get("/Logout/" + sessionStorage.getItem("access_token"))
        .then(sessionStorage.clear(), this.$router.push("/"));
    },
    tomain() {
      this.$router.push("/homepage/main");
    },
    tomap() {
      this.$router.push("/homepage/machineMap");
    },
    systo(){
      window.location.href = 'http://192.168.1.106:7001'; 
    },
    tomsg(){
      this.$router.push("/homepage/messagehub");
    }
  },
};
</script>
<style scoped>
.el-icon-setting {
  color: white;
}
.el-dropdown {
  font-size: 18px;
  margin-right: 15px;
}
.name {
  color: white;
  font-size: 18px;
  margin-right: 30px;
}
.el-menu {
  border-bottom-width: 0px;
  height: 60px;
}
</style>