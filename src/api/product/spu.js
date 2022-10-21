import request from "@/utils/request";
// /admin/product/{page}/{limit} category3Id
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id }, //k,v一致，简写
  });
