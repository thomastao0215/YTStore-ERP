import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

var headers = new Headers({
  "Content-Type":"application/json"
});

export function fetch({ page }) {
  if (page > 0) {
    page = page - 1 ;
  }
  return request(`/api/product/findAll?page=${page}&size=${PAGE_SIZE}`);
}


export function remove(id) {
  return request(`/api/admin/product/delete?id=${id}`, {
    method: 'DELETE',
    mode:"cors",
    credentials: 'include',
    headers,
  });
}

export function patch(id, values) {
  return request(`/api/admin/product/update?id=${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
    mode:"cors",
    credentials: 'include',
    headers,
  });
}

export function create(values) {
  return request('/api/admin/product/add', {
    method: 'POST',
    body: JSON.stringify(values),
    mode:"cors",
    credentials: 'include',
    headers,
  });
}
