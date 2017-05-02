/* global window */
import 'ignore-styles';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';

import { JSDOM } from 'jsdom';
import sinonChai from 'sinon-chai';

const win = (new JSDOM('<!doctype html><html><head></head><body></body></html>')).window;
const doc = win.document;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiEnzyme());
chai.use(chaiImmutable);
chai.use(dirtyChai);
chai.use(sinonChai);
