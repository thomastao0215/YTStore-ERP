import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Orders.css';
import { PAGE_SIZE } from '../../constants';
import OrderModal from './OrderModal';


function Orders({ dispatch, list: dataSource, loading, total, page: current }) {
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
      title: ' 订单id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      fixed: 'left',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '订单名称',
      dataIndex: 'subject',
      key: 'subject',
      width: '100px',
    },
    {
      title: '订单描述',
      dataIndex: 'body',
      key: 'body',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '实际成交额',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '总额',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '关联用户',
      dataIndex: 'userId',
      key: 'userId',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      key: 'address',
      width: '100px'
    },
    {
      title: '收货电话',
      dataIndex: 'phone',
      key: 'phone',
      width: '100px',
    },
    {
      title: '收货邮编',
      dataIndex: 'zipCode',
      key: 'zipCode',
      width: '100px',
    },

    {
      title: '收货人',
      dataIndex: 'consignee',
      key: 'consignee',
      width: '100px',
    },
    {
      title: '关联商品',
      dataIndex: 'orderItems',
      key: 'orderItems',
      width: '100px',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '100px',
    },
    {
      title: '付款时间',
      dataIndex: 'payTime',
      key: 'payTime',
      width: '100px',
    },
    {
      title: '发货时间',
      dataIndex: 'shipTime',
      key: 'shipTime',
      width: '100px',
    },
    {
      title: '配送方式',
      dataIndex: 'shipType',
      key: 'shipType',
      width: '100px',
    },
    {
      title: '运单号',
      dataIndex: 'shipNumber',
      key: 'shipNumber',
      width: '100px',
    },
    {
      title: '商品状态',
      dataIndex: 'productsStatus',
      key: 'productsStatus',
      width: '100px',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: '100px',
    },
    {
      title: '是否退款',
      dataIndex: 'isRefund',
      key: 'isRefund',
      width: '100px',
    },
    {
      title: '退款总额',
      dataIndex: 'refundAmount',
      key: 'refundAmount',
      width: '100px',
    },
    {
      title: '支付交易号',
      dataIndex: 'payNumber',
      key: 'payNumber',
      width: '100px',
    },
    {
      title: '是同意退款',
      dataIndex: 'refundApproval',
      key: 'refundApproval',
      width: '100px',
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => (
        <span className={styles.operation}>
          <OrderModal record={record} onOk={editHandler.bind(null, record.id)}>
            <Button>编辑</Button>
          </OrderModal>
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
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
          scroll={{ x: 2520 }}
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
  const { list, total, page } = state.orders;
  return {
    loading: state.loading.models.orders,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Orders);
