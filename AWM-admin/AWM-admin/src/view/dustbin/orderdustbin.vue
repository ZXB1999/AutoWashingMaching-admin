<template>
  <el-table :data="info" style="width: 100%" height="680">
    <el-table-column prop="updateTime" label="删除时间" width="180">
    </el-table-column>
    <el-table-column prop="orderId" label="订单编号" width="180">
    </el-table-column>
    <el-table-column prop="serverlevel" label="服务类型" width="80"> </el-table-column>
    <el-table-column prop="machineId" label="设备ID"> </el-table-column>
    <el-table-column prop="customerId" label="用户ID"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      info: null,
    };
  },
  created() {
    this.axios
      .get("/Orderdustbin", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => (this.info = response.data));
  },
};
</script>