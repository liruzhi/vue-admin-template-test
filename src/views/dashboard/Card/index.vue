<template>
  <div>
    <el-row :gutter="10">
      <!-- 第一个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 12860">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
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
                  ></path></svg
              ></span>
              <span style="margin-left: 10px"
                >周同比&nbsp;&nbsp;19.16%<svg
                  t="1666857521774"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3544"
                  width="16"
                  height="16"
                >
                  <path
                    d="M64 320l448 448 448-448z"
                    fill="#1afa29"
                    p-id="3545"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <!-- 第二个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts"> <lineChart></lineChart> </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <!-- 第三个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts"> <barChart></barChart> </template>
            <template slot="footer">
              <span>转化率 64%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <!-- 第四个card -->
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts"> <progressChart></progressChart></template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
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
                  ></path></svg
              ></span>
              <span style="margin-left: 10px"
                >周同比&nbsp;&nbsp;19.16%<svg
                  t="1666857521774"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3544"
                  width="16"
                  height="16"
                >
                  <path
                    d="M64 320l448 448 448-448z"
                    fill="#1afa29"
                    p-id="3545"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from "./lineChart";
import barChart from "./barChart";
import progressChart from "./progressChart";
export default {
  name: "Card",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart,
  },
};
</script>

<style></style>
