import React from 'react';
import { connect } from 'dva';
import styles from './Orders.css';
import OrdersComponent from '../components/Orders/Orders';
import MainLayout from '../components/MainLayout/MainLayout';

function Orders({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <OrdersComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Orders);
