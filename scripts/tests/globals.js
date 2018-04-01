// jsdom

import { JSDOM } from 'jsdom';

if ( typeof window == 'undefined' ) {

  global.jsdom = new JSDOM( undefined, { url: 'https://reactoids.com/tests', pretendToBeVisual: true } );

  global.window = jsdom.window;

  global.document = window.document;

  global.navigator = window.navigator;

  global.Element = window.Element;

  global.HTMLElement = window.HTMLElement;

  global.requestAnimationFrame = window.requestAnimationFrame;

  global.cancelAnimationFrame = window.cancelAnimationFrame;

}


// sinon

import sinon from 'sinon';

global.sinon = sinon;

global.spy = sinon.spy;

global.stub = sinon.stub;

global.mock = sinon.mock;

global.smatch = sinon.match;


// chai

import chai from 'chai';

global.chai = chai;

global.expect = chai.expect;


import chaiAsPromised from 'chai-as-promised';

chai.use( chaiAsPromised );


import chaiChange from 'chai-change';

chai.use( chaiChange );


import chaiEnzyme from 'chai-enzyme';

chai.use( chaiEnzyme() );


import sinonChai from 'sinon-chai';

chai.use( sinonChai );
