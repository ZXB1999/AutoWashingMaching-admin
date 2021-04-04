<template>
  <div>
    <div class="mtopL">
      <el-row>
        <el-button type="danger" disabled
          ><i class="el-icon-folder-delete"></i>批量删除</el-button
        >
        <el-button type="success" disabled
          ><i class="el-icon-folder-opened"></i>导出表格</el-button
        >
      </el-row>
    </div>
    <div class="mtopR">
      <el-row>
        <el-input
          style="width: 180px"
          v-model="selinput"
          clearable
          placeholder="请输入账号"
        ></el-input>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="注册日期"
          end-placeholder="注册日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <el-button type="primary" @click="onSubmit">查 找</el-button>
      </el-row>
    </div>
    <el-table :data="info" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createTime" label="注册日期"></el-table-column>
      <el-table-column prop="awmusername" label="账号"></el-table-column>
      <el-table-column prop="awmname" label="昵称"></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="paypwd" label="支付密码"> </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
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
      size: 8,
      info: null,
      formInline: {
        user: "",
        region: "",
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      selinput: null,
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
      this.current = val;
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.value2);
    },
  },
};
</script>
<style scoped>
.mtopL {
  margin-left: 10px;
  margin-top: 10px;
  float: left;
}
.mtopR {
  margin-left: 10px;
  margin-top: 10px;
  float: right;
}
.el-table {
  height: 607px;
}
.el-table::before {
  height: 0;
}
.el-button {
  margin: 0;
}
</style>