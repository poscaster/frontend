import { expect } from 'chai';
import { describe, it } from 'mocha';
import { spy } from 'sinon';

import { apiCall, GET, HEAD, POST } from '../../src/api/_base';

describe('API _base', () => {
  global.API_BASE = 'http://example.com';

  it('Runs unauthorized GET request with query', () => {
    global.fetch = spy();
    apiCall('test')({ a: 'testParam' });
    expect(global.fetch).to.have.been.calledWith('http://example.com/test?a=testParam', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: GET,
    });
  });

  it('Runs unauthorized HEAD request with empty query', () => {
    global.fetch = spy();
    apiCall('test', HEAD)({});
    expect(global.fetch).to.have.been.calledWith('http://example.com/test', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: HEAD,
    });
  });

  it('Runs authorized POST request with query', () => {
    global.fetch = spy();
    apiCall('test', POST)({ a: 'testParam' }, { jwt: 'jwt' });
    expect(global.fetch).to.have.been.calledWith('http://example.com/test', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer jwt',
      },
      method: POST,
      body: '{"a":"testParam"}',
    });
  });
});
