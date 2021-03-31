<template>
  <div id="map" style="width: 100%; height: 100%; margin: 0 auto"></div>
</template>
<script>
import school from "../../../static/mapjson/school.json";
export default {
  methods: {
    myEcharts(val) {
      // 基于准备好的dom，初始化echarts实例<-----------------------------------******************
      this.$echarts.registerMap("school", school);
      var myChart = this.$echarts.init(document.getElementById("map"));
      // 指定图表的配置项和数据
      var option = {
        backgroundColor: "#e9e9eb",
        title: {
          text: "设备分布图",
          subtext: "data from AWMSYSTEM",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: function (param) {
            // console.log(param.data);
            let str = param.data;
            return str.name + "<br/>" + str.state;
          },
        },
        geo: {
          map: "school",
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true, //鼠标滚轮缩放
          aspectScale: 1, //地图长度比
        },
        series: [
          {
            name: "学校地图",
            type: "map",
            coordinateSystem: "geo",
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            itemStyle: {
              color: "#67C23A",
            },
            data: val
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.axios
      .get("/Position", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        this.myEcharts(response.data);
      });
  },
};
</script>