<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :needDisable="scene != 0"
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
                @click="addSku(row)"
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
                @click="handler(row)"
              ></hint-button>

              <!-- slot="reference"必须有 -->
              <!-- 由于版本问题，这里不是文档中写的confirm，而是onConfirm -->
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />
      <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes" />
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              style="width: 100px; height: 100px"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
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
      //通知子组件spuForm发请求：1获取品牌 2获取销售属性
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      //获取子组件SpuForm
      //在父组件中可以通过$ref获取子组件等
      this.$refs.spu.initSpuData(row);
    },

    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku
    addSku(row) {
      //切换场景为2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },

    //skuForm通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看sku的按钮的回调
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.sku.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
      }
      this.loading = false;
    },
    close(done) {
      this.loading = true;
      this.skuList = [];
      done();
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
