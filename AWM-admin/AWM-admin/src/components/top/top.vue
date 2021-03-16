<template>
  <div id="top">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="tomain">首页</el-menu-item>
      <el-menu-item index="2" disabled>系统状态</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <span class="name">欢迎使用AutoWashingMaching-自助洗衣系统后台管理系统</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <!-- 父组件想在子组件上监听自己的click的话，需要加上native修饰符 -->
          <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="name">admin</span>
    </el-menu>

    
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      sessionStorage.clear();
      this.$router.push('/')
    },
    tomain(){
      this.$router.push('/homepage/main')
    }
  },
};
</script>
<style scoped>
.el-icon-setting{
  color: white;
}
.el-dropdown{
  font-size: 18px;
  margin-right: 15px;
}
.name{
  color: white;
  font-size: 18px;
  margin-right: 30px;
}
.el-menu{
  border-bottom-width: 0px;
  height: 60px;
}
</style>