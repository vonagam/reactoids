'use strict';

var SearchParams;

SearchParams = {
  decode: function(search) {
    var params, regexp, tokens;
    params = {};
    if (!search) {
      return params;
    }
    search = search.replace(/^\?/, '').replace('+', ' ');
    regexp = /&?([^=]+)=([^&]*)/g;
    while (tokens = regexp.exec(search)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  },
  encode: function(params) {
    if (_.isEmpty(params)) {
      return '';
    }
    return '?' + _.map(params, function(value, key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).join('&');
  }
};

module.exports = SearchParams;
