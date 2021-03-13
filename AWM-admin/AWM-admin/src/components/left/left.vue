<template>
  <div id="left">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            style="height: 60px; color: white"
            @click.native="home"
            index="1"
          >
            <img src="../../assets/logo/logo01.png" alt="" />
            <span>自助洗衣后台管理系统</span>
          </el-menu-item>
          <el-submenu index="2" disabled>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item @click="machinelist" index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">设备</span>
          </el-menu-item>
          <el-menu-item index="4" @click="userlist">
            <i class="el-icon-document"></i>
            <span slot="title" >用户</span>
          </el-menu-item>
          <el-menu-item index="5" @click="orderlist">
            <i class="el-icon-setting"></i>
            <span slot="title">订单</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: null,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    home() {
      this.$router.push("/homepage/main");
    },
    machinelist() {
      this.$router.push("/homepage/machinelist");
    },
    userlist() {
      this.$router.push("/homepage/userList");
    },
    orderlist(){
      this.$router.push("/homepage/orderlist");
    }
  },
};
</script>
<style scoped>
div {
  height: 100%;
}
.el-menu {
  border: 0;
  height: 100%;
}
</style>