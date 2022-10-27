<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix header-slot">
      <!-- @tab-click="handleClick" -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>

      <!-- 头部右侧内容 -->
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>

        <!--  v-model="value" -->
        <el-date-picker
          class="date"
          v-model="value"
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
        <el-col :span="16">123</el-col>
        <el-col :span="8">456</el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Sale",
  data() {
    return {
      activeName: "销售额",
    };
  },
  components: {},
  methods: {},
};
</script>

<style>
/* 也可写到/src/style/element-ui.scss中 注意不能加scoped */
.el-card__header {
  border-bottom: none;
}

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
</style>
