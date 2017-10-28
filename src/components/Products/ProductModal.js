import React, { Component } from 'react';
import { Modal, Form, Input ,Upload, Icon, Cascader,Select,InputNumber} from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;
var appServer = "http://api.ytstore.com.cn/sts/do";
var bucket = 'xyq-oss-bucket';
var endpoint = 'oss-cn-shenzhen.aliyuncs.com';

const Option = Select.Option;


function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

var applyTokenDo = function (func,option) {
  var url = appServer;
  return OSS.urllib.request(url, {
    method: 'GET'
  }).then(function (result) {
    var creds = JSON.parse(result.data);
    var client = new OSS.Wrapper({
        accessKeyId: creds.AccessKeyId,
        accessKeySecret: creds.AccessKeySecret,
        stsToken: creds.SecurityToken,
        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
        bucket: 'xyq-oss-bucket'
    });
    return func(client,option);
  });
};
function guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      return s4() + s4()  + s4() +  s4()  +
          s4() +  s4() + s4() + s4();
  }

var progress = function (p,option) {
  return function (done) {
    option['p']= {percent:p}
    console.log(option['p'])
    done();
  }
};

var uploadFile = function (client,option) {
  var file = option.file;
  var uuid = guid();
  var storeAs = 'product-'+uuid;
  console.log(file.name + ' => ' + storeAs);
  return client.multipartUpload(storeAs, file, {
    progress: progress
  }).then(function (res) {
    option.onSuccess(res,file);
    console.log('2 success: %j', res);
  });
};


class ProductEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      Avatar: [],
      fileList: [],
      productDetailList: []
    };
  }

  upload(option) {

    applyTokenDo(uploadFile,option);

  }


  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  handleSuccess = (body,file) => {
    console.log(body)
    var newFile = {
      uid:body.name,
      name:body.name,
      status:'done',
      url:'http://xyq-oss-bucket.oss-cn-shenzhen.aliyuncs.com/'+body.name
    }
    var {fileList} = this.state
    fileList.pop()
    fileList.push(newFile)
    console.log(fileList)
    this.setState({ fileList })
  }

  handleAvatarSuccess = (body,file) => {
    console.log(body)
    var newFile = {
      uid:body.name,
      name:body.name,
      status:'done',
      url:'http://xyq-oss-bucket.oss-cn-shenzhen.aliyuncs.com/'+body.name
    }
    var {Avatar} = this.state
    console.log(Avatar)
    Avatar.pop()
    Avatar.push(newFile)
    console.log(Avatar)
    this.setState({ Avatar })
  }

  handleProductDetailSuccess = (body,file) => {
    console.log(body)
    var newFile = {
      uid:body.name,
      name:body.name,
      status:'done',
      url:'http://xyq-oss-bucket.oss-cn-shenzhen.aliyuncs.com/'+body.name
    }
    var {productDetailList} = this.state
    console.log(productDetailList)
    productDetailList.pop()
    productDetailList.push(newFile)
    console.log(productDetailList)
    this.setState({ productDetailList })
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


  handleTagsChange(value) {
    console.log(`selected ${value}`);
  }

    handleModelChange(value) {
      console.log(`selected ${value}`);
    }
    handleOriginChange(value) {
      console.log(`selected ${value}`);
    }

  handleChange = ({fileList}) => {this.setState({ fileList:fileList })}
  handleAvatarChange = ({fileList}) => {this.setState({Avatar:fileList})}
  handleProductDetailChange = ({ fileList }) => {
    this.setState({ productDetailList:fileList })
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['avatar'] = this.state.Avatar
        values['banner'] = this.state.fileList
        values['productDetail'] = this.state.productDetailList
        console.log(values)
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList,Avatar,productDetailList }  = this.state;
    console.log(fileList)
    console.log(Avatar)
    console.log(productDetailList)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { children } = this.props;
    const childrenx = [];
    const originCountry = [
      { key:'1001',value:'CN'},
      { key:'1002',value:'JP'},
      { key:'1003',value:'HK'},
      { key:'1004',value:'TW'},
      { key:'1005',value:'US'},
      { key:'1006',value:'GB'},
      { key:'1007',value:'IT'},
      { key:'1008',value:'FR'},
      { key:'1009',value:'DE'},
      { key:'1010',value:'TH'},
    ]
    const brandX = [
      { key:'1001',value:'YSL'},
      { key:'1002',value:'CPB'},
      { key:'1003',value:'Dior'},
      { key:'1004',value:'TW'},

    ]

    const events = [
       { key:'1001',value:'99select4' },
       { key:'1002',value:'199select4' }
    ]
    const childrenEvents = [];
    events.map( item => {
      childrenEvents.push(<Option value={item.key} >{item.value}</Option>)
    })
    const childrenOrigin = [];
    originCountry.map( item => {
      childrenOrigin.push(<Option key={item.key}>{item.value}</Option>)
    })
    const childrenBrand = [];
    brandX.map( (item => {
      childrenBrand.push(<Option key={item.key}>{item.value}</Option>)
    }))
    for (let i = 10; i < 36; i++) {
      childrenx.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const { getFieldDecorator } = this.props.form;
    const { productCategory,productName,price ,productDesc,brand,series,model ,productCode ,title, stock,sale,originPrice,origin,imgurl,banner,tags,productDetail,avatar} = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    var onChange = function(value) {
        console.log(value);
    }

    const options = [
      {
      value: 'beauty-and-skincare',
      label: '美妆和护肤',
      children: [
      {
        value: 'skincare',
        label: '护肤',
        children: [
        {value: 'CLEANSING',label: '卸妝清潔'},
        {value: 'CREAM / MOISTURIZER',label: '面霜 / 乳液'},
        {
          value: 'EYELIP CARE',
          label: '眼唇護理',
        },
        {
          value: 'LOTION',
          label: '爽膚',
        },
        {
          value: 'SERUM',
          label: '精華',
        },
        {
          value: 'SPECIAL CARE',
          label: '特別修護',
        },
        {value:"UVPROTECTION / CC CREAM",label:"防曬 / CC霜"}],
      },
      {
        value: 'makeup',
        label: '彩妆',
        children: [{
          value: 'LIPS',
          label: '唇妆',
          children:[
            {value:"LIP LINER",label:"唇線修飾筆"},
            {value:"LIPSTAIN",label:"唇釉"},
            {value:"LIPGLOSS",label:"唇彩"},
            {value:"LIPSTICK",label:"唇膏"},
            {value:"GLOSSYSTAIN",label:"唇蜜"},
            {value:"LIPPRIMER",label:"唇部底霜"}
          ]
        },
        {
          value: 'COMPLEXION',
          label: '卸妆',
          children:[
            {value:"a",label:"氣墊粉底"},
            {value:"b",label:"底霜"},
            {value:"c",label:"明彩筆"},
            {value:"d",label:"粉底"},
            {value:"e",label:"粉餅"},
            {value:"f",label:"胭脂"},
            {value:"g",label:"蜜粉"}
          ]
        }],
      }]
      },
     {
      value: 'food',
      label: '食品',
      children: [{
        value: 'drink',
        label: '饮料',
        children: [{
          value: 'Coffee & Tea',
          label: '咖啡 & 茶',
        },
        {
          value: 'Milk & Yogurt',
          label: '牛奶 & 优格',
        },
        {
          value: 'Soft Drink & Juice',
          label: '软饮 & 果汁',
        }],
      },
      {
        value: 'candy&chocolate',
        label: '糖果 & 巧克力',
        children: [{
          value: 'Candy',
          label: '糖果',
        },
        {
          value: 'Chocolate',
          label: '巧克力',
        },
        {
          value: 'Jelly & Pudding',
          label: '果冻 & 布丁',
        }],
      },
      {
        value: 'CAKES & COOKIES',
        label: '糕点 & 饼干',
        children: [{
          value: 'Cakes',
          label: '糕点',
        },
        {
          value: 'COOKIES',
          label: '饼干',
        }],
      }],
    }];

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
                })(<Cascader options={options} onChange={onChange} placeholder="选择类别" changeOnSelect />)
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
                  })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="选择品牌"
                      optionFilterProp="children"
                      onChange={this.handleOriginChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {childrenBrand}
                    </Select>
                  )
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
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="型号"
                    onChange={this.handleModelChange}
                  >
                    {childrenx}
                  </Select>
                )
              }
              </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存"
            >
              {
                getFieldDecorator('stock', {
                  initialValue: 1,
                })(<InputNumber min={1} onChange={onChange} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {
                getFieldDecorator('price', {
                  initialValue: 100,
                })(
                  <InputNumber

                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )
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
                  initialValue: 100,
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="原产地"
            >
              {
                getFieldDecorator('origin', {
                  initialValue: origin,
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择原产地"
                    optionFilterProp="children"
                    onChange={this.handleOriginChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {childrenOrigin}
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="属性&活动"
            >
              {
                getFieldDecorator('tags', {
                  initialValue: tags,
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="属性&活动"
                    onChange={this.handleTagsChange}
                  >
                    {childrenEvents}
                  </Select>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="小图"
            >
              {
                getFieldDecorator('avatar', {

                })(
                  <div className="clearfix">
                    <Upload
                      customRequest={this.upload}
                      listType="picture-card"
                      fileList={Avatar}
                      onPreview={this.handlePreview}

                      onSuccess={this.handleAvatarSuccess}
                      onChange={this.handleAvatarChange}
                    >
                      {fileList.length >= 2 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                )
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="轮播图"
            >
              {
                getFieldDecorator('banner', {

                })(
                  <div className="clearfix">
                    <Upload
                      customRequest={this.upload}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}

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

            <FormItem
              {...formItemLayout}
              label="商品详情图"
            >
              {
                getFieldDecorator('productDetail', {

                })(
                  <div className="clearfix">
                    <Upload
                      customRequest={this.upload}
                      listType="picture-card"
                      fileList={productDetailList}
                      onPreview={this.handlePreview}

                      onSuccess={this.handleProductDetailSuccess}
                      onChange={this.handleProductDetailChange}
                    >
                      {productDetailList.length >= 6 ? null : uploadButton}
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
