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
export async function getAtricleData({page, limit}: AtricleSearchType) {
  return request(`/api/atricle/query`, {
    method: 'GET',
  });
}

/**
 * 新增列表
 * @param param0 
 */
 export async function insertAtricle(params: InsertAtricleType) {
  return request(`/api/atricle/insert`, {
    method: 'GET',
    data: params,
  });
}