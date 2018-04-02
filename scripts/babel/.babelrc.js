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

    [ 'babel-plugin-transform-strict-mode' ],

    [ 'babel-plugin-transform-object-rest-spread', { useBuiltIns: true } ],

    [ 'babel-plugin-transform-decorators-legacy' ],

    [ 'babel-plugin-transform-class-properties' ],

    [ 'babel-plugin-syntax-trailing-function-commas' ],

    [ 'babel-plugin-transform-optional-chaining' ],

    [ require( './plugins/babel-plugin-default-assigment' ) ],

    [ require( './plugins/babel-plugin-development-assert' ) ],

    [ require( './plugins/babel-plugin-auto-import' ), {

      autos: _.compact( _.flatten( [

        require( './autos/reactoids' ),

        require( './autos/react' ),

        require( './autos/lodash' ),

        { name: 'React', source: 'react' },

        { name: 'ReactDOM', source: 'react-dom' },

        { name: 'PropTypes', source: 'prop-types' },

        { name: 'assertPropTypes', member: true, source: 'check-prop-types' },

        { name: 'checkPropTypes', source: 'check-prop-types' },

        { name: '_', source: 'lodash' },

        { name: '$', source: 'jquery' },

        process.env.REACTOIDS_PACKAGE.match( /pixi.js$/ ) && { name: 'PIXI', namespace: true, source: 'pixi.js' },

        process.env.REACTOIDS_PACKAGE.match( /d3$/ ) && { name: 'd3', namespace: true, source: 'd3' },

        process.env.REACTOIDS_PACKAGE.match( /three$/ ) && { name: 'THREE', namespace: true, source: 'three' },

      ] ) ),

    } ],

    [ require( './plugins/babel-plugin-delayed-lodash' ) ],

    [ require( './plugins/babel-plugin-transform-delayed-resolve-wildcard-import' ) ],

    [ 'babel-plugin-module-resolver', { alias: { '~': './sources' } } ],

  ],

};
