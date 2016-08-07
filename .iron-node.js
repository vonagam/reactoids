var windowPath = __dirname + '/tests/window.cjsx';


var settings = {

  nodeModule: {

    arguments: [ 'window', 'document', 'navigator' ],

    scriptInjection: 'window = require("' + windowPath + '"); document = window.document; navigator = window.navigator;'

  }

};


module.exports = settings;
