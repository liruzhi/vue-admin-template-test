import request from "@/utils/request";

//获取图片  /admin/product/spuImageList/5704
export const reqSpuImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });

// /admin/product/spuSaleAttrList/5704
//获取销售属性的数据
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });

// /admin/product/attrInfoList/1/1/1
//获取平台属性的数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) =>
  request({ url: "/admin/product/saveSkuInfo", method: "post", data: skuInfo });

//获取sku列表数据  get /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });

//获取sku列表  get /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });

//上架 get /admin/product/onSale/{skuId}
export const reqSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get",
  });

//下架 get /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get",
  });

//获取sku详情的接口  /admin/product/getSkuById/{skuId}   get
export const reqSkuById = (skuId) =>
  request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: "get",
  });
