/* global API_BASE, fetch */

export const DELETE = 'delete';
export const GET = 'get';
export const HEAD = 'head';
export const PATCH = 'patch';
export const POST = 'post';

function toQuery(obj) {
  const params = [];
  Object.keys(obj).forEach(key => params.push(`${key}=${encodeURIComponent(obj[key])}`));
  if (params.length) {
    return `?${params.join('&')}`;
  }
  return '';
}


export function apiCall(path, method = GET) {
  return (body, { jwt } = {}) => {
    let query = '';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const options = { headers, method };
    if (body) {
      if (method !== GET && method !== HEAD) {
        options.body = JSON.stringify(body);
      } else {
        query = toQuery(body);
      }
    }
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }
    return fetch(`${API_BASE}/${path}${query}`, options);
  };
}

export function resource() {
  throw new Error('Not implemented yet');
}
