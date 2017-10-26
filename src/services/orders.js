import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/photos?_page=${page}&_limit=${PAGE_SIZE}`);
}


export function remove(id) {
  return request(`/api/photos/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/photos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/photos/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function sts(url) {
  OSS.urllib.request(url,
                   {method: 'GET'},
                   function (err, response) {
  if (err) {
   return alert(err);
  }
  try {
   result = JSON.parse(response);
  } catch (e) {
   errmsg = 'parse sts response info error: ' + e.message;
   return alert(errmsg);
  }
  // console.log(result)
  })
}
