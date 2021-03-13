<template>
  <div>
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="awmusername" label="账号"></el-table-column>
      <el-table-column prop="awmname" label="昵称"></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="paypwd" label="支付密码"> </el-table-column>
      <el-table-column>
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination> -->
  </div>
</template>
<script>
import { formatDate } from "../../utils/formatDate.js";
export default {
  data() {
    return {
      info: null,
    };
  },
  created() {
    this.axios
      .get("/UserList", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => (this.info = response.data));
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>