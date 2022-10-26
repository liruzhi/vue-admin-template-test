<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" value="" v-model="attr.attrValueId">
              <el-option
                :label="attrValue.valueName"
                :value="attrValue.id"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="saleAttrValue.id"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="prop" width="55" type="selection">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.imgUrl"
                style="width: 100px; height: 100px"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设置默认</el-button
              >
              <el-button type="success" plain v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="label">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [], //存储图片的信息
      spuSaleAttrList: [], //存储销售属性
      attrInfoList: [], //存储平台属性的数据
      //需要提交的数据
      skuInfo: {
        //第一类：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：需要双向绑定v-model收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "", //描述
        //第三类：需要自己书写代码
        skuDefaultImg: "", //默认图片
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImageId: 0,
          // },
        ],

        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      //目前收集到的数据缺少isDefault
      imageList: [],
    };
  },
  methods: {
    //获取skuForm数据
    async getData(category1Id, category2Id, spu) {
      //收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //获取图片
      let imgResult = await this.$API.sku.reqSpuImageList(spu.id);
      if (imgResult.code == 200) {
        // this.spuImageList = imgResult.data;
        let list = imgResult.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }

      //获取销售属性的数据
      let saleResult = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      if (saleResult.code == 200) {
        this.spuSaleAttrList = saleResult.data;
      }

      //获取平台属性的数据
      let attrResult = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (attrResult.code == 200) {
        this.attrInfoList = attrResult.data;
      }
    },
    //table表格复选框按钮的事件
    handleSelectionChange(val) {
      this.imageList = val;
    },
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      //收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("changeScenes", 0);
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    async save() {
      //整理参数
      ///方式一
      // const { attrInfoList, skuInfo } = this;
      // let arr = [];
      // attrInfoList.forEach((item) => {
      //   if (item.attrValueId) {
      //     let obj = { valueId: attrValueId, attrId: item.id };
      //   }
      //   arr.push(obj);
      // });
      // //将整理好的参数赋值给skuInfo.skuAttrValueList
      // skuInfo.skuAttrValueList = arr;

      this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
        if (item.attrValueId) {
          prev.push({ valueId: item.attrValueId, attrId: item.id });
        }
        return prev;
      }, []);

      //整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce(
        (prev, item) => {
          if (item.saleAttrValueId) {
            prev.push({
              saleAttrId: item.id,
              saleAttrValueId: item.saleAttrValueId,
            });
          }
          return prev;
        }
      );

      //整理图片数据
      this.skuInfo.skuImageList = this.imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      //发请求
      let result = await this.$API.sku.reqAddSku(this.skuInfo);

      console.log(result);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScenes", 0);
        //清除数据
        Object.assign(this._data, this.$options.data());
      }
    },
  },
};
</script>

<style></style>
