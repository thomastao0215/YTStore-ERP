import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Products.css';
import { PAGE_SIZE } from '../../constants';
import ProductModal from './ProductModal';


function Products({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'products/remove',
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
      type: 'products/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'products/create',
      payload: values,
    });

  }




  const columns = [
    {
      title: '商品id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '商品码',
      dataIndex: 'productCode',
      key: 'productCode',
      fixed: 'left',
      width: '100px'
    },
    {
      title: '商品类别',
      dataIndex: 'category',
      key: 'category',
      width: '100px',
    },
    {
      title: '商品名',
      dataIndex: 'name',
      key: 'name',
      width: '100px'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: '100px'
    },
    {
      title: '系列',
      dataIndex: 'series',
      key: 'series',
      width: '100px'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: '100px',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'Price',
      width: '100px'
    },
    {
      title: '商品描述',
      dataIndex: 'productDesc',
      key: 'productDesc',
      width: '100px',
    },

    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: '100px',
    },
    {
      title: '销量',
      dataIndex: 'sale',
      key: 'sale',
      width: '100px',
    },
    {
      title: '商品原价',
      dataIndex: 'originPrice',
      key: 'originPrice',
      width: '100px',
    },
    {
      title: '原产地',
      dataIndex: 'origin',
      key: 'origin',
      width: '100px',
    },
    {
      title: '状态',
      dataIndex: 'release',
      key: 'release',
      width: '100px',
    },
    {
      title: '点击量',
      dataIndex: 'clicks',
      key: 'clicks',
      width: '100px',
    },
    {
      title: '收藏量',
      dataIndex: 'collection',
      key: 'collection',
      width: '100px',
    },
    {
      title: '加入购物车量',
      dataIndex: 'cart',
      key: 'cart',
      width: '150px',
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
      width: '100px',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: '100px',
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => (
        <span className={styles.operation}>
          <ProductModal record={record} onOk={editHandler.bind(null, record.id)}>
            <Button>编辑</Button>
          </ProductModal>
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
          <ProductModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Product</Button>
          </ProductModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource.content}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
          scroll={{ x: 2275 }}

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
  const { list, total, page } = state.products;
  return {
    loading: state.loading.models.products,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Products);
