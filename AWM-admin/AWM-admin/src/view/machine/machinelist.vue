<template>
  <div>
    <!-- <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->

    <div class="mtopL">
      <el-row>
        <el-button type="primary" @click="dialogFormVisible = true"
          ><i class="el-icon-folder-add"></i>新增设备</el-button
        >
        <el-dialog title="设备信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-select v-model="form.brand" placeholder="请选择品牌">
                <el-option label="海尔" value="海尔"></el-option>
                <el-option label="美的" value="美的"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择设备类别">
                <el-option label="洗衣机" value="1"></el-option>
                <el-option label="洗鞋机" value="2"></el-option>
                <el-option label="其他" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备型号" :label-width="formLabelWidth">
              <el-input v-model="form.model" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="newmachine">确 定</el-button>
          </div>
        </el-dialog>
        <el-button
          type="danger"
          @click="PseudodeletelistMachine"
          :disabled="isPseudodeletelist"
          ><i class="el-icon-folder-delete"></i>批量删除</el-button
        >
        <el-button type="success" disabled
          ><i class="el-icon-folder"></i>表格导入</el-button
        >
        <el-button type="success" disabled
          ><i class="el-icon-folder-opened"></i>表格导出</el-button
        >
      </el-row>
    </div>
    <div class="mtopR">
      <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备ID">
            <el-input
              v-model="formInline.machineId"
              placeholder="设备ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select v-model="formInline.brand" placeholder="请选择品牌">
              <el-option label="海尔" value="海尔"></el-option>
              <el-option label="美的" value="美的"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

    <el-table
      :data="info"
      style="width: 100%"
      @select="choiseone"
      @select-all="choiseall"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="createTime" label="添加日期"></el-table-column>
      <el-table-column prop="updateTime" label="更新日期"></el-table-column>
      <el-table-column prop="brand" width="80" label="品牌"> </el-table-column>
      <el-table-column
        prop="machineId"
        label="设备ID"
        width="300"
      ></el-table-column>
      <el-table-column prop="model" label="设备型号"> </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">编辑设备</div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="updatemachine(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-dialog title="修改设备信息" :visible.sync="uptmachine">
            <el-form>
              <el-form-item label="设备型号" :label-width="formLabelWidth">
                <el-input
                  autocomplete="off"
                  v-model="beforeupdatemachinemsg.brand"
                ></el-input>
              </el-form-item>
              <el-form-item label="设备型号" :label-width="formLabelWidth">
                <el-input
                  autocomplete="off"
                  v-model="beforeupdatemachinemsg.model"
                ></el-input>
              </el-form-item>
              <el-form-item label="服务类型" :label-width="formLabelWidth">
                <el-input
                  autocomplete="off"
                  v-model="beforeupdatemachinemsg.type"
                ></el-input>
              </el-form-item>
              <el-form-item label="经度" :label-width="formLabelWidth">
                <el-input
                  autocomplete="off"
                  v-model="beforeupdatemachinemsg.longitude"
                ></el-input>
              </el-form-item>
              <el-form-item label="纬度" :label-width="formLabelWidth">
                <el-input
                  autocomplete="off"
                  v-model="beforeupdatemachinemsg.latitude"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="uptmachine = false">取 消</el-button>
              <el-button
                type="primary"
                @click="commituptmachine(beforeupdatemachinemsg.type)"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <el-tooltip placement="top">
            <div slot="content">删除设备</div>
            <el-button
              type="danger"
              @click="PseudodeleteMachine(scope.row)"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">点击查看设备二维码</div>
            <el-button
              @click="QRcodeimg(scope.row)"
              type="info"
              icon="el-icon-full-screen"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :hide-on-single-page="this.hosp"
      background
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
        .get("/MachineList/" + this.current + "/" + this.size, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then((response) => (this.info = response.data));
    },
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        brand: "",
        model: "",
        type: "",
      },
      dialogFormVisible: false,
      hosp: true,
      totals: 0,
      current: 1,
      size: 8,
      info: null,
      formInline: {
        machineId: "",
        brand: "",
      },
      img: null,
      Pseudodeletelist: [],
      isPseudodeletelist: true,
      uptmachine: false,
      beforeupdatemachinemsg: null,
    };
  },
  created() {
    this.axios
      .get("/MachineList/" + this.current + "/" + this.size, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then(
        (response) => (
          (this.info = response.data),
          (this.beforeupdatemachinemsg = response.data[0])
        )
      );
    this.axios
      .get("/CountMachine", {
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
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.current = val;
    },
    newmachine() {
      this.axios
        .post("/NewMachine", this.form, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then(
          (response) => (this.dialogFormVisible = false),
          this.$message({
            type: "success",
            message: `添加一个设备`,
          })
        );
    },
    onSubmit() {
      console.log("submit!");
      this.axios
        .post("/QueryMachine/" + this.current + "/" + 1000, this.formInline, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
        })
        .then((response) => ((this.info = response.data), (this.totals = 0)));
    },
    QRcodeimg(val) {
      this.axios
        .get("/QRcode/" + val.machineId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          }, //oauth2.0认证
          responseType: "blob",
        })
        .then(
          (response) => (
            (this.img = window.URL.createObjectURL(response.data)),
            this.$alert('<img src="' + this.img + '" alt="">', "设备二维码", {
              confirmButtonText: "下载",
              dangerouslyUseHTMLString: true,
              callback: (action) => {
                // console.log(action)
                if (action === "confirm") {
                  var a = document.createElement("a");
                  a.download = name || val.machineId + "MachineQRcode.jpg";
                  // 设置图片地址
                  a.href = this.img;
                  a.click();
                }
              },
            }).catch((err) => {
              // console.log(err);
            })
          )
        );
    },
    PseudodeleteMachine(val) {
      this.axios
        .post(
          "/PseudodeleteMachine/" + val.machineId,
          {},
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("access_token"),
            }, //oauth2.0认证)
          }
        )
        .then(
          (response) =>
            this.$message({
              type: "success",
              message: "删除成功",
            }),
          this.$router.push("/homepage/machinedustbin")
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: "err",
          });
        });
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
    PseudodeletelistMachine() {
      var that = this;
      this.axios
        .post("/PseudodeleteListMachine", this.Pseudodeletelist, {
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
          this.$router.push("/homepage/machinedustbin")
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: "err",
          });
        });
    },
    updatemachine(val) {
      this.uptmachine = true;
      this.beforeupdatemachinemsg = val;
    },
    commituptmachine(val) {
      alert(val);
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
  height: 585px;
}
.el-table::before {
  height: 0;
}
.el-button {
  margin: 0;
}
</style>
<style>
.el-table-column--selection .cell {
  padding-left: 10px;
}
.el-message-box {
  width: 320px;
}
</style>