<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <i class="el-icon-more"></i>
      </div>
    </div>
    <!-- 折线图 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
    </div>
    <!-- table -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index" label="序号" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination layout="prev, pager, next" :total="50" class="pagination">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./LineCharts";
export default {
  name: "Search",
  components: {
    LineCharts,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "许老三",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "刘小二",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "赵大拿",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "孙老师",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}

.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.pagination {
  float: right;
}
</style>
