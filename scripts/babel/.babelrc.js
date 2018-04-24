'use strict';

const _ = require( 'lodash' );


const BABEL_ENV_OPTIONS = {

  test: { modules: 'commonjs', targets: { node: 'current' } },

  story: { modules: false, targets: { browsers: 'last 2 versions' }, useBuiltIns: true },

  library: { modules: false },

  pages: { modules: false, targets: { browsers: 'last 2 versions' } },

};


module.exports = {

  babelrc: false,

  presets: [

    [ 'babel-preset-env', BABEL_ENV_OPTIONS[ process.env.REACTOIDS_BABEL_ENV ] ],

    [ 'babel-preset-react' ],

  ],

  plugins: [

    [ require( './plugins/babel-plugin-auto-wrap' ) ],

    [ 'babel-plugin-transform-strict-mode' ],

    [ 'babel-plugin-transform-object-rest-spread', { useBuiltIns: true } ],

    [ 'babel-plugin-transform-decorators-legacy' ],

    [ 'babel-plugin-transform-class-properties' ],

    [ 'babel-plugin-syntax-trailing-function-commas' ],

    [ require( './plugins/babel-plugin-default-assigment' ) ],

    [ require( './plugins/babel-plugin-development-assert' ) ],

    [ require( './plugins/babel-plugin-auto-import' ), {

      autos: [

        ...require( './autos/react' ),

        ...require( './autos/lodash' ),

        { name: 'React', source: 'react' },

        { name: 'ReactDOM', source: 'react-dom' },

        { name: 'PropTypes', source: 'prop-types' },

        { name: 'assertPropTypes', member: true, source: 'check-prop-types' },

        { name: 'checkPropTypes', source: 'check-prop-types' },

        { name: '_', source: 'lodash' },

        { name: '$', source: 'jquery' },

      ],

    } ],

    [ require( './plugins/babel-plugin-root-import' ) ],

    [ require( './plugins/babel-plugin-reactoids-import' ) ],

    [ require( './plugins/babel-plugin-delayed-lodash' ) ],

    [ require( './plugins/babel-plugin-delayed-transform-resolve-wildcard-import' ) ],

  ],

};
