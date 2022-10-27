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
        type: "category",
      },
      yAxis: {
        //隐藏y轴
        show: false,
      },
      series: [
        {
          //图表的形式
          type: "bar",
          data: [10, 63, 33, 88, 28, 13, 55, 90],
          color: "cyan",
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
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
