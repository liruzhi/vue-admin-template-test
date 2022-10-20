<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 2px 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column prop="valueName" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="index" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      //控制table表格的显示与隐藏
      isShowTable: true,
      //收集新增属性|修改属性使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], // attrId,valueName
        categoryId: 0, //此处不能直接写this.category3Id,会是undefined。别再data中收集，因为对象是无序的
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
      } else {
        //代表三级分类的id有了
        this.category3Id = categoryId;
        //发送请求获取平台属性数据
        this.getAttrList();
      }
    },
    //获取平台属性数据
    async getAttrList() {
      //获取分类的ID
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );

      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });

      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //清除数据,收集三级分类的id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [], // attrId,valueName
        categoryId: this.category3Id, //此处不能直接写this.category3Id,会是undefined。别再data中收集，因为对象是无序的
        categoryLevel: 3,
      };
    },
    //修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;

      //由于对象里面嵌套数组，数组里面又嵌套对象，因此需要使用深拷贝解决这类问题。
      this.attrInfo = cloneDeep(row);

      this.attrInfo.attrValueList.forEach((item) => {
        //这样写也可以给属性添加flag字段，但是会发现视图不会跟着变化。（因为flag不是响应式数据）
        // item.flag = false;

        //Vue.set( target, propertyName/index, value )
        //向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
        //它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property
        // (比如 this.myObject.newProperty = 'hi')
        this.$set(item, "flag", false);
      });
    },

    //失去焦点的事件，切换为查看模式
    toLook(row) {
      //不能为空
      if (row.valueName.trim() == "") {
        this.$message("格式有误");
        return;
      }

      //不能重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepat) {
        return;
      }

      row.flag = false;
    },
    //变为编辑模式
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，自动实现聚焦
      //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重排需要消耗时间
      //点击span的时候，重绘重排一个input需要时间，因此我们不能一点击span就立马获取到input。this.$refs[index]此时为undefined.
      //$nextTick,当节点渲染完毕了，会执行一次。
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },

    //气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      //当前删除属性的操作不需要发送请求
      this.attrInfo.attrValueList.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
