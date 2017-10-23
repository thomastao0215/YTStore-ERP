import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ProductEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { productCategory,productName,price ,productDesc , brand,series,model ,productCode ,title, stock,sale,originPrice,origin} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit Product"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
          <FormItem
            {...formItemLayout}
            label="商品码"
          >
            {
              getFieldDecorator('productCode', {
                initialValue: productCode,
              })(<Input />)
            }
          </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品类别"
            >
              {
                getFieldDecorator('productCategory', {
                  initialValue: productCategory,
                })(<Input />)
              }
            </FormItem>
              <FormItem
                {...formItemLayout}
                label="商品名"
              >
                {
                  getFieldDecorator('productName', {
                    initialValue: productName,
                  })(<Input />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="品牌"
              >
                {
                  getFieldDecorator('brand', {
                    initialValue: brand,
                  })(<Input />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="系列"
              >
                {
                  getFieldDecorator('series', {
                    initialValue: series,
                  })(<Input />)
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="型号"
              >
                {
                  getFieldDecorator('model', {
                    initialValue: model,
                  })(<Input />)
                }
              </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存"
            >
              {
                getFieldDecorator('stock', {
                  initialValue: stock,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {
                getFieldDecorator('price', {
                  initialValue: price,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品描述"
            >
              {
                getFieldDecorator('productDesc', {
                  initialValue: productDesc,
                })(<TextArea rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品原价"
            >
              {
                getFieldDecorator('originPrice', {
                  initialValue: originPrice,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原产地"
            >
              {
                getFieldDecorator('origin', {
                  initialValue: origin,
                })(<Input />)
              }
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ProductEditModal);
