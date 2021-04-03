<template>
  <div>
    <el-row>
      <el-col
        :span="4"
        v-for="(ary, index) in arrary"
        :key="index"
      >
        <el-card :body-style="{ padding: '10px' }">
          <img :src="img[index]" class="image" />
          <div style="padding: 14px">
            <span>{{ ary.brand }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ ary.update_time }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      arrary: null,
      img: [],
    };
  },
  mounted() {
    var msg = [];
    var _this = this;
    this.axios
      .get("/MachinerecycleBin", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        for (var a = 0; a < response.data.length; a++) {
          this.axios
            .get("/QRcode/" + response.data[a].machine_id, {
              headers: {
                Authorization:
                  "Bearer " + sessionStorage.getItem("access_token"),
              }, //oauth2.0认证
              responseType: "blob",
            })
            .then((res) => {
              msg.push(
                JSON.parse(JSON.stringify(window.URL.createObjectURL(res.data)))
              );
            });
        }
        this.arrary = response.data;
        _this.img = msg;
      });
  },
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

