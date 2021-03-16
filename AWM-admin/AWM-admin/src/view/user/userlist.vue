<template>
  <div>
    <div class="mtop">
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
    </div>
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="createTime"  label="注册日期"></el-table-column>
      <el-table-column prop="awmusername" label="账号"></el-table-column>
      <el-table-column prop="awmname" label="昵称"></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="paypwd" label="支付密码"> </el-table-column>
      <el-table-column>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :hide-on-single-page="this.hosp"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      @prev-click="prev"
      @next-click="next"
      :page-size="this.size"
      :total="this.totals"
    >
    </el-pagination>
  </div>
</template>
<script>
import { formatDate } from "../../utils/formatDate.js";
export default {
  watch: {
    current() {
      this.axios
        .get("/UserList/" + this.current + "/" + this.size, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then((response) => (this.info = response.data));
    },
  },
  data() {
    return {
      hosp: true,
      totals: 0,
      current: 1,
      size: 7,
      info: null,
    };
  },
  created() {
    this.axios
      .get("/UserList/" + this.current + "/" + this.size, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => (this.info = response.data));
    this.axios
      .get("/CountUser", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => (this.totals = response.data));
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  methods: {
    prev() {
      this.current -= 1;
    },
    next() {
      this.current += 1;
    },
    // whitchpage() {},
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.current=val;
    },
  },
};
</script>
<style scoped>
.mtop {
  float: left;
}
</style>