global.defSinon = function( name, definition ) {

  const eachSpy = function( iterator ) {

    let value = get( name );

    let spies = _.isPlainObject( value ) ? _.values( value ) : _.castArray( value );

    _.each( spies, ( spy ) => {

      if ( _.isFunction( spy ) ) iterator( spy );

    } );

  };


  let isStatic;

  if ( typeof definition === 'function' ) {

    if ( definition.restore || definition.reset ) {

      defFunc( name, definition );

      isStatic = true;

    } else {

      defAwait( name, definition );

      isStatic = false;

    }

  } else {

    def( name, definition );

    isStatic = true;

  }


  afterEach( `ui/defSinon: ${ name } cleanup after each`, () => {

    eachSpy( ( spy ) => {

      if ( spy.restore && ! isStatic ) return spy.restore();

      if ( spy.resetHistory ) return spy.resetHistory();

      if ( spy.reset ) return spy.reset();

    } );

  } );

  if ( isStatic ) {

    afterAll( `ui/defSinon: ${ name } cleanup after all`, () => {

      eachSpy( ( spy ) => {

        if ( spy.restore ) return spy.restore();

      } );

    } );

  }

};
