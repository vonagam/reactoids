const REACT_FORWARD_REF_TYPE = React.forwardRef( _.noop ).$$typeof;

const isWrapper = function( type ) {

  if ( ! _.isObject( type ) ) return false;

  if ( type.$$typeof !== REACT_FORWARD_REF_TYPE ) return false;

  if ( ! type.render.wrapper ) return false;

  return true;

};

const createWrapper = function( Component, overrides, identity ) {

  let each = _.isArray( overrides ) ? _.each : _.tap;


  let render = function( props, ref ) {

    props = _.assign( { ref }, props );

    each( overrides, ( overrides ) => {

      if ( overrides.props ) _.assign( props, _.funced( overrides.props, props ) );

    } );

    return React.createElement( Component, props );

  };

  render.displayName = `wrapper(${ Component.displayName || Component.name })`;


  let wrapper = React.forwardRef( render );

  wrapper.propTypes = _.clone( Component.propTypes );

  wrapper.defaultProps = _.clone( Component.defaultProps );

  each( overrides, ( overrides ) => {

    if ( overrides.propTypes ) wrapper.propTypes = _.assign( wrapper.propTypes, overrides.propTypes );

    if ( overrides.defaultProps ) wrapper.defaultProps = _.assign( wrapper.defaultProps, overrides.defaultProps );

  } );


  render.wrapper = {

    Component,

    overrides,

    identity,

  };


  return wrapper;

};

const getIdentity = function( Component ) {

  if ( isWrapper( Component ) ) {

    return Component.render.wrapper.identity;

  } else {

    return Component;

  }

};


export default Wrapper = {

  create( Component, overrides = {} ) {

    let identity;


    if ( overrides.identity ) {

      identity = {};

    }


    if ( isWrapper( Component ) ) {

      identity = identity || Component.render.wrapper.identity;

      overrides = _.concat( _.castArray( Component.render.wrapper.overrides ), overrides );

      Component = Component.render.wrapper.Component;

    } else {

      identity = identity || Component;

    }


    let wrapper = createWrapper( Component, overrides, identity );

    return wrapper;

  },

  getComponent( Component ) {

    if ( isWrapper( Component ) ) {

      Component = Component.render.wrapper.Component;

    }

    return Component;

  },

  connect( wrappers ) {

    _.each( wrappers, ( wrapper ) => {

      let defaultProps = wrapper.defaultProps;

      if ( ! defaultProps || ! defaultProps.Components ) return;

      defaultProps.Components = _.mapValues( defaultProps.Components, ( Component ) => {

        let componentIdentity = getIdentity( Component );

        let componentWrapper = _.find( wrappers, ( wrapper ) => {

          return wrapper.render.wrapper.identity === componentIdentity;

        } );

        if ( componentWrapper ) {

          return componentWrapper;

        } else {

          return Component;

        }

      } );

    } );

    return wrappers;

  },

};
