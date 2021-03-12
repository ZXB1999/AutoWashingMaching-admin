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
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">我的工作台</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a target="_blank">订单管理</a></el-menu-item>

      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
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
</style>