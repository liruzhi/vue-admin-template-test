<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1666854523757"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2669"
        width="26"
        height="26"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2670"
          fill="#bfbfbf"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">123139</span>
      <span class="main-content">17.1</span>
      <svg
        t="1666857345914"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2527"
        width="16"
        height="16"
      >
        <path
          d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
          p-id="2528"
          fill="#d81e06"
        ></path>
      </svg>

      <svg
        t="1666857521774"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3544"
        width="16"
        height="16"
      >
        <path d="M64 320l448 448 448-448z" fill="#1afa29" p-id="3545"></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
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
          type: "line",
          data: [50, 88, 66, 77, 102, 133, 90],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "blue",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
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
.header {
  /* 垂直居中 */
  display: flex;
  align-items: center;
}

.search-header {
  margin-right: 20px;
}

.mian {
  margin: 10px 0;
}

.main-title {
  margin-right: 30px;
}

.main-content {
  margin-right: 10px;
}

.charts {
  width: 100%;
  height: 50px;
}
</style>
