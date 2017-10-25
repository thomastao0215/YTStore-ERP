var appServer = "http://localhost:8080/sts/do";
var bucket = 'xyq-oss-bucket';
var endpoint = 'oss-cn-shenzhen.aliyuncs.com';

var urllib = OSS.urllib;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

var applyTokenDo = function (func,option) {
  var url = appServer;
  return urllib.request(url, {
    method: 'GET'
  }).then(function (result) {
    var creds = JSON.parse(result.data);
    var client = new OSS({
        accessKeyId: result.AccessKeyId,
        accessKeySecret: result.AccessKeySecret,
        stsToken: result.SecurityToken,
        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
        bucket: 'xyq-oss-bucket'
    });
    return func(client,option);
  });
};

var progress = function (p,option) {
  return function (done) {
    option['p']= {percent:p}
    console.log(option['p'])
    done();
  }
};

var uploadFile = function (client,option) {
  var file = option.file;
    var uuid = this.guid();
  var storeAs = 'product-'+uuid;
  console.log(file.name + ' => ' + storeAs);
  return client.multipartUpload(storeAs, file, {
    progress: progress
  }).then(function (res) {
    option.onSuccess(res,file);
    console.log('upload success: %j', res);
    return listFiles(client);
  });
};

function getError(option, result) {
  const msg = `cannot post ${option.action} ${result.res.status}'`;
  const err = new Error(msg);
  err.status = result.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4()  + s4() +  s4()  +
        s4() +  s4() + s4() + s4();
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }







export default function upload(option) {

  applyTokenDo(uploadFile,option);

}
