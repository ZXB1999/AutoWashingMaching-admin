<template>
  <div>
    <div class="mtopL">
      <el-row>
        <el-button type="success" disabled
          ><i class="el-icon-folder-opened"></i>表格导出</el-button
        >
        <el-popconfirm title="这一条内容确定删除吗？" @confirm="toban">
          <el-button
            slot="reference"
            type="danger"
            :disabled="isPseudodeletelist"
            ><i class="el-icon-folder-delete"></i>批量失效</el-button
          >
        </el-popconfirm>
      </el-row>
    </div>
    <div class="mtopR">
      <el-row>
        <el-input
          style="width: 180px"
          v-model="selinput1"
          clearable
          placeholder="请输用户账号"
        ></el-input>
        <el-input
          style="width: 180px"
          v-model="selinput2"
          clearable
          placeholder="请输设备ID"
        ></el-input>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="创建时间"
          end-placeholder="创建时间"
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
      @select="choiseone"
      @select-all="choiseall"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createTime" label="订单创建时间"></el-table-column>
      <el-table-column prop="startTime" label="订单开始时间"></el-table-column>
      <el-table-column
        prop="orderId"
        label="订单ID"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="customerId"
        label="顾客ID"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="machineId"
        label="设备ID"
        width="280"
      ></el-table-column>
      <!-- prop="orderState" -->
      <el-table-column width="80" label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.orderState == 0">正常</span>
          <span v-else>停用</span>
        </template>
      </el-table-column>
      <!-- prop="serverlevel" -->
      <el-table-column width="80" label="服务">
        <template slot-scope="scope">
          <span
            v-if="
              scope.row.serverlevel == 'MIN' || scope.row.serverlevel == 'ONE'
            "
            ><el-button type="success" circle>少量</el-button></span
          >
          <span
            v-else-if="
              scope.row.serverlevel == 'MID' || scope.row.serverlevel == 'TWO'
            "
            ><el-button type="warning" circle>中量</el-button></span
          >
          <span
            v-else-if="
              scope.row.serverlevel == 'MAX' || scope.row.serverlevel == 'THREE'
            "
            ><el-button type="info" circle>大量</el-button></span
          >
          <span v-else><el-button type="primary" circle>甩干</el-button></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">订单失效</div>
            <el-popconfirm
              title="这一条内容确定删除吗？"
              @confirm="PseudodeleteOrder(scope.row)"
            >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
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
          .get("/OrderList/" + this.current + "/" + this.size, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            }, //oauth2.0认证
          })
          .then((response) => (this.info = response.data));
      } else {
        this.axios
          .post(
            "/MulticonditionalqueryOrder/" + this.current + "/" + this.size,
            this.fl,
            {
              headers: {
                Authorization:
                  "Bearer " + sessionStorage.getItem("access_token"),
              }, //oauth2.0认证
            }
          )
          .then((response) => (this.info = response.data));
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
      selinput1: null,
      selinput2: null,
      isPseudodeletelist: true,
      isselectpage: false,
      fl: null,
    };
  },
  created() {
    this.axios
      .get("/OrderList/" + this.current + "/" + this.size, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => (this.info = response.data));
    this.axios
      .get("/CountOrder", {
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
      var comrut = {};
      if (this.selinput1 != null && this.selinput1 != "") {
        comrut.awmusername = this.selinput1;
      }
      if (this.selinput2 != null && this.selinput2 != "") {
        comrut.machineId = this.selinput2;
      }
      if (this.value2.length === 2) {
        comrut.begin = this.value2[0];
        comrut.end = this.value2[1];
      }

      this.fl = comrut;

      this.axios
        .post(
          "/MulticonditionalqueryOrder/" + this.current + "/" + this.size,
          this.fl,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            }, //oauth2.0认证
          }
        )
        .then(
          (response) => (
            (this.info = response.data), (this.isselectpage = true)
          )
        );
      this.axios
        .post("/CountMulticonditionalqueryOrder", this.fl, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then((response) => (this.totals = response.data));
    },
    choiseone(row) {
      this.Pseudodeletelist = row;
      if (this.Pseudodeletelist.length > 1) {
        this.isPseudodeletelist = false;
      } else {
        this.isPseudodeletelist = true;
      }
    },
    choiseall(selection) {
      this.Pseudodeletelist = selection;
      if (this.Pseudodeletelist.length > 1) {
        this.isPseudodeletelist = false;
      } else {
        this.isPseudodeletelist = true;
      }
    },
    PseudodeleteOrder(val) {
      var Olist = [];
      Olist.push(val);
      this.axios
        .put("/PseudodeletelistOrder", Olist, {
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
          this.$router.push("/homepage/orderdustbin")
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: "err",
          });
        });
    },
    toban() {
      this.axios
        .put("/PseudodeletelistOrder", this.Pseudodeletelist, {
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
          this.$router.push("/homepage/orderdustbin")
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