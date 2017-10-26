import React, { Component } from 'react';
import { Modal, Form, Input ,Upload, Icon, Cascader,Select,Checkbox} from 'antd';
Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const FormItem = Form.Item;
const { TextArea } = Input;
var appServer = "http://localhost:8080/sts/do";
var bucket = 'xyq-oss-bucket';
var endpoint = 'oss-cn-shenzhen.aliyuncs.com';

const Option = Select.Option;


function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

class OrderEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      productsStatus:'unpaied',
      checkShipNumber: false,
    };
  }


  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  handleChangeX = (value) => {

    this.setState({
      checkShipNumber: value == "unreceived" ? true : false
    }, () => {
      this.props.form.validateFields(['shipNumber'], { force: true });
    });

  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {

      if (!err) {
        console.log (this.props.shipTime == undefined && values.shipNumber !== undefined)
        if (this.props.shipTime == undefined && values.shipNumber !== undefined ) {
          values['shipTime'] = new Date().format("yyyy-MM-dd hh:mm:ss");
        }
        console.log(values)
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList, productDetailList }  = this.state;
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
      { key:'1005',value:'US'},
      { key:'1006',value:'GB'},
      { key:'1007',value:'IT'},
      { key:'1008',value:'FR'},
      { key:'1009',value:'DE'},
      { key:'1010',value:'TH'},
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
    const { productsStatus,orderStatus,orderNumber,shipType,shipNumber,isRefund,refundApproval} = this.props.record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    var onChange = function(value) {
        console.log(value);
    }

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="Edit Order"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="订单号"
            >
              {
                getFieldDecorator('orderNumber', {
                  initialValue: orderNumber,
                })(<Input disabled />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="配送方式"
            >
              {
                getFieldDecorator('shipType', {
                  initialValue: "Express",
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择配送方式"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="Express">快递</Option>
                    <Option value="SameCity">同城配送</Option>
                    <Option value="CampusAmbassador">校园大使</Option>
                    <Option value="SelfPick">自提</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品状态"
            >
              {
                getFieldDecorator('productsStatus', {
                  initialValue: "OrderUnreceived",
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择商品状态"
                    optionFilterProp="children"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="OrderUnreceived">未收到订单</Option>
                    <Option value="OrderReceived">已收到订单</Option>
                    <Option value="OutOfStock">商品缺货</Option>
                    <Option value="Packaged">商品已打包</Option>
                    <Option value="Delivered">商品已出库</Option>
                  </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="订单状态"
            >
              {
                getFieldDecorator('orderStatus', {
                  initialValue: "unpaied",
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择订单状态"
                    optionFilterProp="children"
                    onChange={this.handleChangeX}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    <Option value="unpaied">待支付</Option>
                    <Option value="undelivered">待发货</Option>
                    <Option value="unreceived">待收货</Option>
                    <Option value="uncomment">待评价</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label="运单号">
              {getFieldDecorator('shipNumber', {
                rules: [{
                  required: this.state.checkShipNumber,
                  message: '请输入运单号',
                }],
              })(
                <Input placeholder="Please input your shipNumber" />
              )}
            </FormItem>

          <FormItem {...formItemLayout} label="同意退款">
            {getFieldDecorator('refundApproval', {
            })(
              <Checkbox onChange={onChange}/>
            )}
          </FormItem>

        </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(OrderEditModal);
