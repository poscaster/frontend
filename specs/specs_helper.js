/* global window */
import 'ignore-styles';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom';
import sinonChai from 'sinon-chai';

const doc = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiEnzyme());
chai.use(chaiImmutable);
chai.use(sinonChai);
