/* global API_BASE, fetch */

export const GET = 'get';
export const PATCH = 'patch';
export const POST = 'post';

export function apiCall(path, method = 'get') {
  return (body, { jwt } = {}) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (jwt) {
      headers.Authorize = `bearer ${jwt}`;
    }
    return fetch(`${API_BASE}/${path}`, {
      body: JSON.stringify(body),
      headers,
      method,
    });
  };
}

export function resource() {
  throw new Error('Not implemented yet');
}
