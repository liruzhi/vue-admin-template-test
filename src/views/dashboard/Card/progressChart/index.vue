<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);

    //配置数据
    lineChart.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        //隐藏y轴
        show: false,
        //均分(在y轴均分表示横排)
        type: "category",
      },
      series: [
        {
          //图表的形式
          type: "bar",
          data: [78],
          color: "yellowGreen",
          barWidth: 10,
          //背景颜色设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          //文本的设置
          label: {
            show: true,
            // formatter: "|",
            // position: "right",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
