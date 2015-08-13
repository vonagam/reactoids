'use strict';

var ReactDOM, findDOM;

ReactDOM = window.ReactDOM || window.React;

findDOM = _.bind(ReactDOM.findDOMNode, ReactDOM);

module.exports = findDOM;
