export default Wrapper = {

  create( Component, overrides = {} ) {

    let overrideProps = overrides.props || _.noop;

    const wrappedRender = function( props, ref ) {

      return <Component

        ref={ ref }

        { ...props }

        { ...overrideProps( props ) }

      />

    };

    wrappedRender.displayName = `wrap(${ Component.displayName || Component.name })`;


    let wrapper = React.forwardRef( wrappedRender );

    wrapper.propTypes = _.assign( {}, Component.propTypes, overrides.propTypes );

    wrapper.defaultProps = _.assign( {}, Component.defaultProps, overrides.defaultProps );


    _.assign(

      wrapper,

      _.omit( Component, CONST( [ 'displayName', 'name', 'propTypes', 'defaultProps', 'getDerivedStateFromProps' ] ) ),

      overrides.statics,

    );


    return wrapper;

  },

  connect( wrappers ) {

    _.each( wrappers, ( wrapper ) => {

      let defaultProps = wrapper.defaultProps || {};

      if ( ! defaultProps.Components ) return;

      defaultProps.Components = _.mapValues( defaultProps.Components, ( Component, name ) => {

        if ( _.hasOwn( wrappers, name ) ) {

          return wrappers[ name ];

        } else {

          return Component;

        }

      } );

    } );

    return wrappers;

  },

};
