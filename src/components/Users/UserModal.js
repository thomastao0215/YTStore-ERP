import React, { Component } from 'react';
import { Modal, Form, Input ,Upload, Icon, Cascader,Select} from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;
var appServer = "/api/sts/do";
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


class UserEditModal extends Component {

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

  handleUserDetailSuccess = (body,file) => {
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
    console.log(fileList)
    this.setState({ fileList })
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

  handleChange = ({ fileList }) => {this.setState({ fileList })}

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        values['banner'] = this.state.fileList
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
    const { username,phone,nickName,headimgurl,signature,sex,province,city,birthday} = this.props.record;
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
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
