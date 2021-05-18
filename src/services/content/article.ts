import request from '@/utils/request';
export type AtricleSearchType = {
  page?: number;
  limit?: number;
}

export type InsertAtricleType = {
  content: string,
  author: string,
  title: string,
}

/**
 * 分页条件查询 文章列表
 * @param param0 
 */
export async function getAtricleData(data: AtricleSearchType) {
  return request(`/api/atricle/query`, {
    method: 'GET',
    data,
  });
}

/**
 * 新增列表
 * @param param0 
 */
 export async function insertAtricle(params: InsertAtricleType) {
   console.log("params",params);
  return request(`/api/atricle/insert`, {
    method: 'POST',
    data: params,
  });
}