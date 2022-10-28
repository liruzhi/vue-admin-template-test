<template>
  <div>
    <el-card>
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio3">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>

      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      radio3: "上海",
    };
  },
  mounted() {
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "直接访问",
        subtext: 300,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "销售类别占比",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },

          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频广告" },
            { value: 735, name: "联盟广告" },
            { value: 580, name: "搜索引擎" },
            { value: 484, name: "邮件营销" },
            { value: 300, name: "直接访问" },
          ],
        },
      ],
    });

    //绑定事件
    mychart.on("mouseover", (params) => {
      mychart.setOption({
        title: {
          text: params.data.name,
          subtext: params.data.value,
        },
      });
    });
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3px;
  border-bottom: 1px solid #eee;
}

.charts {
  width: 100%;
  height: 300px;
}
</style>
