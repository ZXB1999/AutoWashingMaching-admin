<template>
  <div id="left">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
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
          <el-menu-item @click="machinelist" index="/homepage/machinelist">
            <i class="el-icon-menu"></i>
            <span slot="title">设备</span>
          </el-menu-item>
          <el-menu-item index="/homepage/userList" @click="userlist">
            <i class="el-icon-document"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-menu-item index="/homepage/orderlist" @click="orderlist">
            <i class="el-icon-receiving"></i>
            <span slot="title">订单</span>
          </el-menu-item>

          <el-submenu index="/homepage">
            <template slot="title">
              <i class="el-icon-delete-solid"></i>
              <span>垃圾箱</span>
            </template>

            <el-menu-item-group title="设备回收站">
              <el-menu-item @click="machinedustbin" index="/homepage/machinedustbin"
                >已删除的设备</el-menu-item
              >
            </el-menu-item-group>

            <el-menu-item-group title="用户回收站">
              <el-menu-item @click="userdustbin" index="/homepage/userdustbin"
                >已封禁的用户</el-menu-item
              >
            </el-menu-item-group>

            <el-menu-item-group title="订单回收站">
              <el-menu-item @click="orderdustbin" index="/homepage/orderdustbin"
                >已删除的订单</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
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
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    home() {
      let that = this;
      if (this.isCollapse === false) {
        this.isCollapse = true;
        that.$emit("wid", 64);
        return;
      } else if (this.isCollapse === true) {
        this.isCollapse = false;
        that.$emit("wid", 200);
        return;
      }
    },
    machinelist() {
      this.$router.push("/homepage/machinelist");
    },
    userlist() {
      this.$router.push("/homepage/userList");
    },
    orderlist() {
      this.$router.push("/homepage/orderlist");
    },
    machinedustbin() {
      this.$router.push("/homepage/machinedustbin");
    },
    orderdustbin() {
      this.$router.push("/homepage/orderdustbin");
    },
    userdustbin() {
      this.$router.push("/homepage/userdustbin");
    },
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