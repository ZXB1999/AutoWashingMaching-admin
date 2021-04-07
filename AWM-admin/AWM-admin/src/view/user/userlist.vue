<template>
  <div>
    <div class="mtopL">
      <el-row>
        <el-popconfirm title="确定封禁这些用户吗？" @confirm="toban">
          <el-button slot="reference" type="danger" :disabled="isbanlist"
            ><i class="el-icon-circle-close"></i>批量封禁</el-button
          >
        </el-popconfirm>
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
    <el-table
      :data="info"
      style="width: 100%"
      @select="banone"
      @select-all="banall"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createTime" label="注册日期"></el-table-column>
      <el-table-column prop="awmusername" label="账号"></el-table-column>
      <el-table-column prop="awmname" label="昵称"></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="paypwd" label="支付密码"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">封禁用户</div>
            <el-popconfirm title="确定封禁吗？" @confirm="banuser(scope.row)">
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-circle-close"
              ></el-button>
            </el-popconfirm>
          </el-tooltip>
        </template>
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
      if (!this.isselectpage) {
        this.axios
          .get("/UserList/" + this.current + "/" + this.size, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            }, //oauth2.0认证
          })
          .then((response) => (this.info = response.data));
      } else {
        var commit = {};
        if (this.selinput != null && this.selinput != undefined) {
          commit.awmusername = this.selinput;
        }
        if (this.value2.length === 2) {
          commit.begin = this.value2[0];
          commit.end = this.value2[1];
        }
        this.axios
          .post(
            "/MulticonditionalqueryUser/" + this.current + "/" + this.size,
            commit,
            {
              headers: {
                Authorization:
                  "Bearer " + sessionStorage.getItem("access_token"),
              }, //oauth2.0认证
            }
          )
          .then((response) => {
            this.info = response.data;
          });
      }
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
      isbanlist: true,
      userbanlist: null,
      isselectpage: false,
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
      var commit = {};
      if (this.selinput != null && this.selinput != undefined) {
        commit.awmusername = this.selinput;
      }
      if (this.value2.length === 2) {
        commit.begin = this.value2[0];
        commit.end = this.value2[1];
      }
      this.axios
        .post(
          "/MulticonditionalqueryUser/" + this.current + "/" + this.size,
          commit,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            }, //oauth2.0认证
          }
        )
        .then((response) => {
          this.info = response.data;
          this.isselectpage = true;
        });
      this.axios
        .post("/MulticonditionalqueryUsersize", commit, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then((response) => {
          this.totals = response.data;
        });
    },
    banuser(val) {
      var ulist = [];
      ulist.push(val);
      this.userbanlist = ulist;
      this.axios
        .put("/PseudodeleteListUser", this.userbanlist, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证)
        })
        .then(
          (response) =>
            this.$message({
              type: "success",
              message: "删除成功",
            }),
          this.$router.push("/homepage/userdustbin")
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: "err",
          });
        });
    },
    banone(row) {
      if (row.length > 1) {
        this.isbanlist = false;
      } else {
        this.isbanlist = true;
      }
      this.userbanlist = row;
    },
    banall(selection) {
      if (selection.length > 1) {
        this.isbanlist = false;
      } else {
        this.isbanlist = true;
      }
      this.userbanlist = selection;
    },
    toban() {
      this.axios
        .put("/PseudodeleteListUser", this.userbanlist, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证)
        })
        .then(
          (response) =>
            this.$message({
              type: "success",
              message: "删除成功",
            }),
          this.$router.push("/homepage/userdustbin")
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: "err",
          });
        });
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