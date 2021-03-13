<template>
  <div>
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="orderId" label="订单ID"> </el-table-column>
      <el-table-column prop="customerId" label="顾客ID"></el-table-column>
      <el-table-column prop="machineId" label="设备ID"> </el-table-column>
      <el-table-column prop="orderState" label="订单状态"> </el-table-column>
      <el-table-column prop="serverlevel" label="服务"> </el-table-column>
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
      .get("/OrderList", {
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