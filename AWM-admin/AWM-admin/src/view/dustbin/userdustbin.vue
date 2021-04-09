<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="4" v-for="(user, index) in usersmsg" :key="index"
        ><el-card
          shadow="hover"
          :body-style="{ background: '#f4f4f5', padding: '10px' }"
        >
          <div>
            <el-avatar> {{ user.awmusername }} </el-avatar>
          </div>
          <el-button type="text" class="button" @click="usermsg"
            >操作按钮</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usersmsg: null,
    };
  },
  mounted() {
    this.axios
      .get("/BlackHouse", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        this.usersmsg = response.data;
      });
  },
  methods: {
    usermsg() {
      console.log("111111");
    },
  },
};
</script>
<style scope>
.el-col-4 {
  padding: 6px;
}
</style>