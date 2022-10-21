<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :needDisable="needDisable"
      />
    </el-card>
    <el-card>
      <!-- 底部将来有三部分进行切换 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮需要用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" />
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script>
//引入子组件(需要在components中注册)
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      needDisable: false,
      page: 1, //代表分页器当前是第几页
      limit: 3, //每页需要展示几条数据
      records: [],
      total: 0, //分页器一共需要展示数据的条数
      scene: 0, //0-代表展示SPU列表 1-添加SPU|修改SPU 2-添加SKU
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        //清除2、3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        //清除3级分类id
        this.category3Id = "";
      } else {
        //代表三级分类的id有了
        this.category3Id = categoryId;
        //发送请求获取Spu列表
        this.getSpuList();
      }
    },
    async getSpuList(curPage = 1) {
      this.page = curPage;
      //结构出数据
      const { page, limit, category3Id } = this;
      //请求列表
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);

      console.log(result);

      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加Spu的回调
    addSpu() {
      this.scene = 1;
    },
    //修改某一个spu
    updateSpu(row) {
      this.scene = 1;
    },
  },
  //注册组件
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style scoped></style>
