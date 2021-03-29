<template>
  <div class="Echarts">
    <el-row>
      <h1>订单分析</h1>
      <div
        class="ec"
        id="main"
        ref="hour"
        style="width: 50%; height: 400px"
      ></div>
      <div class="ec" id="main1" style="width: 50%; height: 400px"></div>
    </el-row>
    <el-row>
      <h1>月度数据分析</h1>
      <div class="ec" id="main2" style="width: 50%; height: 400px"></div>
      <div class="ec" id="main3" style="width: 50%; height: 400px"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
    return {};
  },
  methods: {
    myEcharts(val) {
      // 基于准备好的dom，初始化echarts实例<-----------------------------------******************
      var myChart = this.$echarts.init(this.$refs.hour);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "最近消费时间",
        },
        tooltip: {},
        legend: {
          data: ["订单量"],
        },
        xAxis: {
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "订单量",
            type: "bar",
            data: [
              val[1],
              val[2],
              val[3],
              val[4],
              val[5],
              val[6],
              val[7],
              val[8],
              val[9],
              val[11],
              val[11],
              val[12],
              val[13],
              val[14],
              val[15],
              val[16],
              val[17],
              val[18],
              val[19],
              val[20],
              val[21],
              val[22],
              val[23],
              val[24],
            ],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts1(val) {
      var myChart1 = this.$echarts.init(document.getElementById("main1"));
      var axisData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      var data = [0, 0, 0, 0, 0, 0, 0];
      if (val.Monday !== undefined) {
        data[0] = val.Monday;
      }
      if (val.Tuesday !== undefined) {
        data[1] = val.Tuesday;
      }
      if (val.Wednesday !== undefined) {
        data[2] = val.Wednesday;
      }
      if (val.Thursday !== undefined) {
        data[3] = val.Thursday;
      }
      if (val.Friday !== undefined) {
        data[4] = val.Friday;
      }
      if (val.Saturday !== undefined) {
        data[5] = val.Saturday;
      }
      if (val.Tuesday !== undefined) {
        data[6] = val.Tuesday;
      }
      var links = data.map(function (item, i) {
        return {
          source: i,
          target: i + 1,
        };
      });
      links.pop();
      var option = {
        title: {
          text: "热度",
        },
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: axisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "graph",
            layout: "none",
            coordinateSystem: "cartesian2d",
            symbolSize: 40,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            data: data,
            links: links,
            lineStyle: {
              color: "#2f4554",
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option);
    },
    myEcharts2(val) {
      var myChart2 = this.$echarts.init(document.getElementById("main2"));
      var option = {
        title: {
          text: "销售额",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "收入￥",
            type: "bar",
            barWidth: "60%",
            data: [
              val.Monday,
              val.Tuesday,
              val.Wednesday,
              val.Thursday,
              val.Friday,
              val.Saturday,
              val.Tuesday,
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option);
    },
    myEcharts3() {
      var myChart3 = this.$echarts.init(document.getElementById("main3"));
      var option = {
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "销售（sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Techology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）",
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）",
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option);
    },
  },
  mounted() {
    this.axios
      .get("/StatisticalHour", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        this.myEcharts(response.data);
      });
    this.axios
      .get("/StatisticalWeek", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        this.myEcharts1(response.data);
      });
    this.axios
      .get("/StatisticalSaleRoom", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        }, //oauth2.0认证
      })
      .then((response) => {
        this.myEcharts2(response.data);
      });
    this.myEcharts3();
  },
};
</script>

<style scoped>
.ec {
  float: left;
}
</style>

