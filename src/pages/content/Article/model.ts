import type { Effect, Reducer } from 'umi';
import {
  getAtricleData as getAtricleDataApi,
  insertAtricle as insertAtricleApi
} from '@/services/content/article';

type selectData = {
  name: string,
  id: string,
  key_id: string,
  key_name: string,
}

export type FormType = {
  id?: string;
  title: string;
  colLayout: number,
  placeholder: string,
  name: string,
  type: string,
  width?: number,
  selectData?: selectData[],
  picker?: string
  vertical?:string
}

export type ArticleType = {
  id?: string;
  title: string;
  author: string;
  collectCount: number;
  content1?: string;
  content2?: string;
  coverImg?: string;
  createTime?: string;
  editorType?: number;
  isShow?: number;
  modifyTime?: string;
  summary?: string;
  viewCount?: number;
  zanCount?: number;
}

export type MType = {
  namespace: string;
  state: {
  };
  effects?: {
    getAtricleList: Effect,
    insertAtricle: Effect
  },
  reducers?: {
    setArticleList: Reducer
  }
}

const M: MType = {
  namespace: 'article',
  state: {
    articleList: [],
    articleTotalCount: 0
  },
  effects: {
    *getAtricleList({ payload }, { call, put }) {
      // 解构返回结果,判断是否成功
      const { data } = yield call(getAtricleDataApi, payload);
      yield put({
        type: 'setArticleList',
        payload: data
      })
    },
    *insertAtricle({ payload },{call, put}) {
      console.log(payload);
      
      yield call(insertAtricleApi, payload);
    }
  },
  reducers: {
    // 第二个参数为action: {type:string ,payload: any}
    setArticleList(state,{payload:articleList}){
      // 由于单向数据流的设计理念 reducer每次需要重新返回新的完整的state
      return {
        ...state,
        articleList
      }
    }
  }
}

export default M;