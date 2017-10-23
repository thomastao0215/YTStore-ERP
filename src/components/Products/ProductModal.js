import React, { Component } from 'react';
import { Modal, Form, Input ,Upload, Icon} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ProductEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
    };
  }



  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  handleSuccess = (body) => {
    console.log(body)
  }
  handleProgress = (event) => {
    console.log(event.percent)
  }
  handleCancel = () => this.setState({ previewVisible: false })
  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleUpload = ({file}) => {
    var file = file
    var storeAs = 'upload-file';
    console.log(file.name + ' => ' + storeAs);
    OSS.urllib.request("http://localhost:8080/sts/do",
                    {method: 'GET'},
                    function (err, response) {
        if (err) {
          return alert(err);
        }
        try {

          result = JSON.parse(response);
          console.log(result)
        } catch (e) {
          return alert('parse sts response info error: ' + e.message);
        }
        var client = new OSS.Wrapper({
          accessKeyId: result.AccessKeyId,
          accessKeySecret: result.AccessKeySecret,
          stsToken: result.SecurityToken,
          endpoint: 'ytstortest',
          bucket: 'oss-cn-hangzhou.aliyuncs.com'
        });
        client.multipartUpload(storeAs, file).then(function (result) {
          console.log(result);
        }).catch(function (err) {
          console.log(err);
        });
      });
  }


  handleChange = ({ fileList }) => this.setState({ fileList })

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList }  = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { productCategory,productName,price ,productDesc , brand,series,model ,productCode ,title, stock,sale,originPrice,origin,imgurl,banner} = this.props.record;
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
            <FormItem
              {...formItemLayout}
              label="小图"
            >
              {
                getFieldDecorator('banner', {
                  initialValue: banner,
                })(
                  <div className="clearfix">
                    <Upload
                      customRequest={this.handleUpload}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onProgres={this.handleProgress}
                      onSuccess={this.handleSuccess}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ProductEditModal);
