import request from "@/utils/request";

export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

//添加品牌 /admin/product/baseTrademark/save  post

//更新品牌  /admin/product/baseTrademark/update put

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: "post",
      data: tradeMark,
    });
  } else {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: "put",
      data: tradeMark,
    });
  }
};
