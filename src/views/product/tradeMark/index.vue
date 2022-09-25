<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加</el-button>

    <!-- 表格组件 -->
    <!-- type=index  展示序号 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="warning" icon="el-icon-edit" size="mini"
            >修改</el-button
          >

          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
    };
  },
  //组件挂载完毕发请求
  mounted() {
    // console.log(this.$API);
    this.getPageList();
  },
  methods: {
    //获取品牌列表的数据
    async getPageList() {
      //解构出参数
      const { page, limit } = this;
      //获取品牌列表的接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
        this.page = result.data.current;
        this.limit = result.data.size;
      }
    },
    handleCurrentChange(pager) {
      console.log(`当前页: ${pager}`);
      this.page = pager;
      this.getPageList();
    },
  },
};
</script>

<style scoped></style>
