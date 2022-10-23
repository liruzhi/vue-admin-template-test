<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>

        <el-table style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu初始化的时候是一个空对象，在修改spu的时候，可以利用服务器返回的对象来收集数据。
      //但是添加的时候，并没有发送请求。所以不能是空对象，具体的对象内的字段需要结合接口文档。
      spu: {
        //三级分类id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //品牌id
        tmId: 0,
        //id: 0,
        //收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   spuId: 0,
          // },
        ],

        //平台属性与属性值收集
        spuSaleAttrList: [
          {
            // baseSaleAttrId: 0,
            // id: 0,
            // saleAttrName: "",
            // spuId: 0,
            // spuSaleAttrValueList: [
            //   {
            //     baseSaleAttrId: 0,
            //     id: 0,
            //     isChecked: "",
            //     saleAttrName: "",
            //     saleAttrValueName: "",
            //     spuId: 0,
            //   },
            // ],
          },
        ],
      }, //存储spu信息属性
      tradeMarkList: [], //品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //初始化SpuForm数据
    async initSpuData(spu) {
      //获取SPU信息的接口
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }

      //获取品牌数据
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }

      // 获取图片列表 reqSpuImageList(id)
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        // this.spuImageList = spuImageResult.data;
        let listArr = spuImageResult.data;
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        //需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //把整理好的数据赋值给spuImageList
        this.spuImageList = listArr;
      }

      //reqBaseSaleAttrList
      let saleReuslt = await this.$API.spu.reqBaseSaleAttrList();
      if (saleReuslt.code == 200) {
        this.saleAttrList = saleReuslt.data;
      }
    },
  },
};
</script>

<style></style>
