import request from '../utils/request';
import { PAGE_SIZE } from '../constants';


export function fetch({ page }) {
  return request(`/api/admin/user/findAll?page=${page}&size=${PAGE_SIZE}`);
}


export function remove(id) {
  return request(`/api/admin/product/delete?id=${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/admin/product/delete?id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/admin/product/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
