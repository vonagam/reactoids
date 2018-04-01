import * as enzyme from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import createClass from 'create-react-class';

import getClassNames from './contexts/getClassNames';

import getStrings from './contexts/getStrings';


enzyme.configure( { adapter: new EnzymeAdapter() } );


const contextTypes = {

  getClassNames: PropTypes.func,

  getStrings: PropTypes.func,

};

const context = {

  getClassNames: getClassNames,

  getStrings: getStrings,

};

const ContextWrapper = createClass( {

  displayName: 'ContextWrapper',

  childContextTypes: contextTypes,

  getChildContext: _.constant( context ),

  render() { return this.props.children; },

} );


global.shallow = function( node, options ) {

  options = _.defaultsDeep( {}, options, { context: context } );

  return enzyme.shallow( node, options );

};

global.mount = function( node, options ) {

  options = _.defaultsDeep( {}, options, { context: context, childContextTypes: contextTypes } );

  return enzyme.mount( node, options );

};

global.render = function( node ) {

  return enzyme.render( <ContextWrapper>{ node }</ContextWrapper> ).children().first();

};
