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
        <!-- 照片墙需要在删除(on-remove)和新增(on-success)时收集数据 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >

        <!-- SPU销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!--   @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
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
        tmId: "",
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
          // {
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
          // },
        ],
      }, //存储spu信息属性
      tradeMarkList: [], //品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
      attrIdAndAttrName: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //file:代表的是删除的那张照片
      //fileList:照片墙删除某一张照片后剩余的其他图片
      // console.log(file, fileList);
      this.spuImageList = fileList;
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

    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    //添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向spuSaleAttrList中添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };

      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      //通过响应式数据inputValue字段收集新增的销售属性
      this.$set(row, "inputValue", "");
    },
    //el-input失去焦点的事件
    handleInputConfirm(row) {
      //结构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row;

      //判断新增的值
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }

      //不能重复,此处也可以用some函数
      let isRepeat = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName == inputValue
      );

      if (isRepeat) {
        this.$message("属性值不能重复");
        return;
      }
      //新增的属性值 kv一致，省略v
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };

      row.spuSaleAttrValueList.push(newSaleAttrValue);

      row.inputVisible = false;
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //整理参数：需要整理照片墙的数据
      //携带参数：对于图片，需要携带imageName,imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          //注意：此处是imgName、imgUrl不是imageName、imageUrl
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });

      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);

      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        //通知父组件，回到场景0
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    //点击添加SPU按钮的时候，发请求的函数
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      //获取品牌数据
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }

      //获取平台全部的销售属性
      let saleReuslt = await this.$API.spu.reqBaseSaleAttrList();
      if (saleReuslt.code == 200) {
        this.saleAttrList = saleReuslt.data;
      }
    },
    //取消按钮
    cancel() {
      //通知父组件切换场景为0
      this.$emit("changeScene", { scene: 0 });
      //清理数据
      //Object.assign:es6中新增的方法
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
