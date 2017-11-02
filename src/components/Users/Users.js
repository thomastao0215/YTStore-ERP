import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';


function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/products',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: ' 用户id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      fixed: 'left',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: '100px',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '头像',
      dataIndex: 'headerImgUrl',
      key: 'headerImgUrl',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '签名',
      dataIndex: 'signature',
      key: 'signature',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: '100px'
    },
    {
      title: '身份',
      dataIndex: 'identity',
      key: 'identity',
      width: '100px',
    },
    {
      title: '关联微信',
      dataIndex: 'realatedWechat',
      key: 'realatedWechat',
      width: '100px',
    },

    {
      title: '关联微博',
      dataIndex: 'realatedWeibo',
      key: 'realatedWeibo',
      width: '100px',
    },
    {
      title: '关联QQ',
      dataIndex: 'relatedQQ',
      key: 'relatedQQ',
      width: '100px',
    },
    {
      title: '黑卡会员',
      dataIndex: 'membership',
      key: 'membership',
      width: '100px',
    },
    {
      title: '当月消费额',
      dataIndex: 'monthlySpending',
      key: 'monthlySpending',
      width: '100px',
    },
    {
      title: '累计消费额',
      dataIndex: 'totalSpending',
      key: 'totalSpending',
      width: '100px',
    },
    {
      title: '推荐码',
      dataIndex: 'promotionCode',
      key: 'promotionCode',
      width: '100px',
    },
    {
      title: '推荐人数',
      dataIndex: 'recommendation',
      key: 'recommendation',
      width: '100px',
    },

    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <Button>编辑</Button>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <Button href="">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>

        </div>
        <Table
          columns={columns}
          dataSource={dataSource.content}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
          scroll={{ x: 1825 }}

        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
