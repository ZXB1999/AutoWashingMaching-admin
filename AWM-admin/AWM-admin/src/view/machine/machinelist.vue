<template>
  <div>
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="createTime" label="日期"></el-table-column>
      <el-table-column prop="brand" label="品牌"> </el-table-column>
      <el-table-column
        prop="machineId"
        label="设备ID"
        width="300"
      ></el-table-column>
      <el-table-column prop="model" label="设备型号"> </el-table-column>
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
      .get("/MachineList", {
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