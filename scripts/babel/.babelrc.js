'use strict';

const _ = require( 'lodash' );


module.exports = {

  babelrc: false,

  presets: [

    // [ 'babel-preset-env', { modules: 'commonjs', targets: { browsers: '> 1%', uglify: false }, useBuiltIns: true } ],

    // [ 'babel-preset-env', { modules: 'commonjs', targets: { browsers: 'last 2 versions', uglify: false }, useBuiltIns: true } ],

    // [ 'babel-preset-env', { modules: 'commonjs', targets: { node: 'current' } } ],

    [ 'babel-preset-env', { modules: false, targets: { node: 'current' }, useBuiltIns: true } ],

    [ 'babel-preset-react' ],

  ],

  plugins: [

    [ 'babel-plugin-transform-strict-mode' ],

    [ 'babel-plugin-transform-object-rest-spread', { useBuiltIns: true } ],

    [ 'babel-plugin-transform-decorators-legacy' ],

    [ 'babel-plugin-transform-class-properties' ],

    [ 'babel-plugin-syntax-trailing-function-commas' ],

    [ 'babel-plugin-transform-optional-chaining' ],

    [ 'babel-plugin-module-resolver', { alias: { '~': './sources' } } ],

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

  ],

};
