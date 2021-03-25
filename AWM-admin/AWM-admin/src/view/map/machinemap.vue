<template>
  <div id="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
</template>
<script>
import school from "../../../static/mapjson/school.json";
export default {
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例<-----------------------------------******************
      this.$echarts.registerMap("school", school);
      var myChart = this.$echarts.init(document.getElementById("map"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "设备分布图",
        },
        series: [
          {
            name: "学校地图",
            type: "map",
            mapType: "school",
            aspectScale: 1, //地图长度比
            roam: false,//鼠标滚轮缩放
            label: {
              show: true,
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>