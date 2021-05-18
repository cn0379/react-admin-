import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Space, Button } from 'antd';
import type { TableColumnType } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import BaseFrom from '@/components/BaseFrom'
import CreateArticle from './createArticle'
import styles from './index.less';
import type { FormType, ArticleType } from './model'

const namespace = 'article';

type SearchType = {
  auther: string;
  title: string;
  info: string;
}


type CreateAtricleType = {
  auther: string;
  content: string;
  title: string;
}

type ColumnType = {
  title: string;
  content: string;
  author: string;
}

type StateType = {
  articleList: ArticleType[];
  dispatch: Dispatch;
};

type PropsType = {
  articleList: ArticleType[];
  dispatch: Dispatch
}

// 引入明细组件
const Article: React.FC<PropsType> = (props) => {

  const { articleList, dispatch } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const formData: FormType[] = [
    {
      title: '标题',
      id: '1',
      colLayout: 6,
      placeholder: '请选择姓名',
      name: 'title',
      type: 'select',
      selectData: [
        {
          name: 'jack',
          id: '1',
          key_id: 'id',
          key_name: 'name',
        },
        {
          name: 'bob',
          id: '2',
          key_id: 'id',
          key_name: 'name',
        }
      ],
    },
    {
      title: '作者',
      id: '2',
      colLayout: 6,
      placeholder: '请输入作者信息',
      name: 'auther',
      type: 'input',
    },
    {
      title: '详细',
      id: '3',
      colLayout: 6,
      placeholder: '请输入详细信息',
      name: 'info',
      type: 'date',
      vertical: 'vertical',
      picker: 'week'
    },
  ]

  const colums: TableColumnType<ColumnType>[] = [
    {
      title: '#',
      // 如果定义形参未使用 建议添加_
      render(_text, _record, index) {
        return `${index + 1}`;
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '操作',
      render: () => (
        <Space>
          <a >编辑</a>
          <a className={styles.delBtn}>删除</a>
        </Space>
      )
    }
  ];

  // 可以监听值的变化
  useEffect(() => {
    console.log('start',page);
    queryAtricle()
  }, [page, limit]);

  // 搜索条件的数据
  const getSearchData = (data: SearchType): void => {
    
  }

  // 查询文章
  const queryAtricle = (): void => {
    dispatch({
      type: `${namespace}/getAtricleList`,
      payload: {
        limit,
        page,
      },
    });
  }

  // 新增文章
  const createAtricle = (): void => {
    setIsModalVisible(true)
  }

  const changePage = (page:number,limit:number):void => {
    setPage(page)
    setLimit(limit)
  }

  // 关闭弹窗
  const closeCreateArticle = () => {
    setIsModalVisible(false)
  }
  // 确认新增
  const confirmCreate = (data: CreateAtricleType): void => {
    setIsModalVisible(false)
    dispatch({
      type: `${namespace}/insertAtricle`,
      payload: data,
    });
    queryAtricle()
  }

  return (
    <div>
      <PageContainer className={styles.main} >
        <Card className={styles.searchBar} >
          <BaseFrom
            getSearchData={getSearchData}
            formData={formData}
          ></BaseFrom>
          <Button type="primary" onClick={createAtricle} style={{ marginLeft: '20px' }}>
            新增
         </Button>
        </Card>
        <Table
          loading={false}
          rowKey="id"
          columns={colums}
          pagination={{
            showSizeChanger: true,
            // total: 99,
            showTotal: detailTotal => `总共 ${detailTotal} 条记录`,
            onChange: changePage,
          }}
          dataSource={articleList}
        />

      </PageContainer>
      <CreateArticle visible={isModalVisible} confirmCreate={confirmCreate} closeHander={closeCreateArticle} />
    </div>
  )
}

/**
 * 提取需要的属性
 * dva-loading
 * @param param0
 */
const mapStateToProps = (state: StateType) => {
  return {
    articleList: state[namespace].articleList,
    dispatch: state.dispatch,
    // articleTotalCount: state[namespace].articleTotalCount,
  };
};

export default connect(mapStateToProps)(Article);