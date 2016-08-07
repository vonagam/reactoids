jsdom = require( 'jsdom' );


window = jsdom.jsdom( undefined, { url: 'https://reactoids.com/tests' } ).defaultView;


module.exports = window;
