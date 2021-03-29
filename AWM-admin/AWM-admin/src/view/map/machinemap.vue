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
                color: '#67C23A'
            },
            data: [
              {
                name: "某洗衣机1",
                state: "空闲",
                value: [122.5109214, 37.1679302],
              },
              {
                name: "某洗衣机2",
                state: "空闲",
                value: [122.5115114, 37.1679815],
              },
              {
                name: "某洗衣机3",
                state: "空闲",
                value: [122.5109267, 37.1675498],
              },
              {
                name: "某洗衣机4",
                state: "空闲",
                value: [122.5115651, 37.1675925],
              },
              {
                name: "某洗衣机5",
                state: "空闲",
                value: [122.5109535, 37.1671351],
              },
              {
                name: "某洗衣机6",
                state: "空闲",
                value: [122.5115705, 37.1671992],
              },
              {
                name: "某洗衣机7",
                state: "空闲",
                value: [122.5109911, 37.166776],
              },
              {
                name: "某洗衣机8",
                state: "空闲",
                value: [122.5115544, 37.1668145],
              },
              {
                name: "某洗衣机9",
                state: "空闲",
                value: [122.5109428, 37.1663657],
              },
              {
                name: "某洗衣机10",
                state: "空闲",
                value: [122.5115383, 37.1664597],
              },
              {
                name: "某洗衣机11",
                state: "空闲",
                value: [122.5098592, 37.1677379],
              },
              {
                name: "某洗衣机12",
                state: "空闲",
                value: [122.5104064, 37.1677592],
              },
              {
                name: "某洗衣机13",
                state: "空闲",
                value: [122.5098485, 37.1673403],
              },
              {
                name: "某洗衣机14",
                state: "空闲",
                value: [122.510401, 37.1673531],
              },
              {
                name: "某洗衣机15",
                state: "空闲",
                value: [122.5098324, 37.1669299],
              },
              {
                name: "某洗衣机16",
                state: "空闲",
                value: [122.51043856143951, 37.166942761692766],
              },
              {
                name: "某洗衣机17",
                state: "空闲",
                value: [122.50991821289062, 37.16654520517695],
              },
              {
                name: "某洗衣机18",
                state: "空闲",
                value: [122.51048684120178, 37.16657085404751],
              },
            ],
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