<template>
  <div>
    <el-container>
      <!-- 侧边 -->
      <el-aside class="left" width="200px">
        <Left></Left>
      </el-aside>
      <!-- 顶部 -->
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <Top></Top>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "../../components/top/top.vue";
import Left from "../../components/left/left.vue";
export default {
  components: {
    Top,
    Left,
  }
};
</script>

<style scoped>
div {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  border: 0;
}

.el-container {
  height: 100%;
}
</style>

