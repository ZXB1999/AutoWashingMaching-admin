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
          roam: false, //鼠标滚轮缩放
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
                value: [122.5109213590622, 37.167930231731894],
              },
              {
                name: "某洗衣机2",
                state: "空闲",
                value: [122.51151144504546, 37.16798152852423],
              },
              {
                name: "某洗衣机3",
                state: "空闲",
                value: [122.51092672348022, 37.16754977943521],
              },
              {
                name: "某洗衣机4",
                state: "空闲",
                value: [122.51156508922577, 37.16759252697982],
              },
              {
                name: "某洗衣机5",
                state: "空闲",
                value: [122.51095354557039, 37.16713512699802],
              },
              {
                name: "某洗衣机6",
                state: "空闲",
                value: [122.5115704536438, 37.167199248657646],
              },
              {
                name: "某洗衣机7",
                state: "空闲",
                value: [122.51099109649657, 37.16677604469881],
              },
              {
                name: "某洗衣机8",
                state: "空闲",
                value: [122.5115543603897, 37.16681451788389],
              },
              {
                name: "某洗衣机9",
                state: "空闲",
                value: [122.5109428167343, 37.16636566283913],
              },
              {
                name: "某洗衣机10",
                state: "空闲",
                value: [122.51153826713562, 37.16645970887882],
              },
              {
                name: "某洗衣机11",
                state: "空闲",
                value: [122.50985920429228, 37.167737868450494],
              },
              {
                name: "某洗衣机12",
                state: "空闲",
                value: [122.51040637493134, 37.16775924217259],
              },
              {
                name: "某洗衣机13",
                state: "空闲",
                value: [122.50984847545624, 37.16734031611728],
              },
              {
                name: "某洗衣机14",
                state: "空闲",
                value: [122.5104010105133, 37.16735314041873],
              },
              {
                name: "某洗衣机15",
                state: "空闲",
                value: [122.50983238220215, 37.166929937321676],
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