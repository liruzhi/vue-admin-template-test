import request from "@/utils/request";
// /admin/product/{page}/{limit} category3Id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id }, //k,v一致，简写
  });

//获取一个SPU信息 /admin/product/getSpuById/5092
export const reqSpu = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });

//品牌的下拉框数据需要发送请求 /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () =>
  request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });

//获取平台全部销售属性列表   /admin/product/baseSaleAttrList

export const reqBaseSaleAttrList = () =>
  request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get",
  });

//获取spu图片 /admin/product/spuImageList/5092
export const reqSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });
