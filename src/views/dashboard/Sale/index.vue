<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix header-slot">
      <!-- @tab-click="handleClick"   @tab-click="handleClick"-->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>

      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>

        <!--   -->
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd"
          class="date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>

    <!-- 内容区 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6">
          <div class="charts-right">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span>
                <span class="rcontent">肯德基</span>
                <span class="rvalue">323,234</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span class="rcontent">麦当劳</span>
                <span class="rvalue">299,381</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span class="rcontent">汉堡王</span>
                <span class="rvalue">289,132</span>
              </li>
              <li>
                <span class="rnomarlindex">4</span>
                <span class="rcontent">海底捞</span>
                <span class="rvalue">260,732</span>
              </li>
              <li>
                <span class="rnomarlindex">5</span>
                <span class="rcontent">重庆火锅</span>
                <span class="rvalue">257,897</span>
              </li>
              <li>
                <span class="rnomarlindex">6</span>
                <span class="rcontent">大槐树水饺</span>
                <span class="rvalue">230,636</span>
              </li>
              <li>
                <span class="rnomarlindex">7</span>
                <span class="rcontent">云南米线</span>
                <span class="rvalue">179,688</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      date: [], //日历数据
    };
  },
  components: {},
  methods: {
    handleClick() {
      console.log(333);
    },
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      console.log(day);
      this.date = [day, day];
    },
    setWeek() {
      //这么写的话是从上周日到本周六
      // let start = dayjs().startOf("week").format("YYYY-MM-DD");
      // let end = dayjs().endOf("week").format("YYYY-MM-DD");

      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");

      this.date = [start, end];
    },

    setMonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },

    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  mounted() {
    console.log(this.title);
    console.log(this.listState.orderFullYear);
    //初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
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
          data: [
            // "1月",
            // "2月",
            // "3月",
            // "4月",
            // "5月",
            // "6月",
            // "7月",
            // "8月",
            // "9月",
            // "10月",
            // "11月",
            // "12月",
          ],
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
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [
            // 10, 52, 200, 334, 390, 330, 220, 110, 150, 480, 370, 90
          ],
          // color: "yellowGreen",
          // color: this.title == "销售额" ? "green" : "blue",
        },
      ],
    });
  },
  //监听属性
  watch: {
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: [
          {
            data:
              this.title == "销售额"
                ? this.listState.orderFullYearAxis
                : this.listState.userFullYearAxis,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: this.title == "销售额" ? "green" : "blue",
          },
        ],
      });
    },

    listState() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: [
          {
            data:
              this.title == "销售额"
                ? this.listState.orderFullYearAxis
                : this.listState.userFullYearAxis,
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: this.title == "销售额" ? "green" : "blue",
          },
        ],
      });
    },
  },
};
</script>

<style>
/* 也可写到/src/style/element-ui.scss中 注意不能加scoped */
.el-card__header {
  border-bottom: none;
}
</style>

<style scoped>
.header-slot {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.tab {
  width: 100%;
}

.right {
  position: absolute;
  right: 0px;
}

.date {
  width: 200px;
  margin: 0px 20px;
}

.right span {
  margin: 0 10px;
}

.charts {
  width: 100%;
  height: 300px;
}

.charts-right {
  padding: 0px;
}

ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}

ul li {
  height: 8%;
  margin: 10px 0;
}

.rindex {
  float: left;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
}
/* background-color: transparent;  */
.rnomarlindex {
  float: left;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
}

.rcontent {
  margin-left: 15px;
}

.rvalue {
  float: right;
}
</style>

<style scoped></style>
