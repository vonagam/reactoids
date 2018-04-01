export default BaseKeyMixin = Mixin.create( {

  name: 'BaseKeyMixin',

  argTypes: {

    name: PropTypes.string,

    get: PropTypes.func, // ( that: mixed, props: {}, state: {} ) => mixed

    set: PropTypes.func, // ( that: mixed, value: mixed, callback: () => void ) => void

  },

  defaultArgs: {

    name: '',

  },

  mixin( ARGS ) {

    const method = _.pascalCase( `${ ARGS.name }Key` );

    const member = `_${ _.pascalCase( ARGS.name ) }KeyMixin`;


    const getValue = function( that ) {

      if ( that[ member ].stale ) {

        that[ member ].cache = ARGS.get( that, that[ member ].stale.props, that[ member ].stale.state );

        delete that[ member ].stale;

      }

      return that[ member ].cache;

    };

    const setValue = function( that, value, callback ) {

      that[ member ].cache = value;

      delete that[ member ].cache;

      ARGS.set( that, value, callback || _.noop );

    };

    const getKey = function( value, key, defaultValue ) {

      let result;

      if ( _.isEmpty( key ) ) {

        result = value || defaultValue;

      } else {

        result = _.get( value, key, defaultValue );

      }

      return result;

    };

    const setKey = function( value, key, updater ) {

      if ( _.isEmpty( key ) ) {

        value = updater( value );

      } else {

        _.updateWith( value, key, updater, ( object ) => {

          return object ? _.clone( object ) : undefined;

        } );

      }

      return value;

    };

    const updateKey = function( that, key, updater, callback ) {

      let cache = getValue( that );

      let value = _.clone( cache );

      value = setKey( value, key, updater );

      if ( _.isEqual( value, cache ) ) { callback(); return; };

      setValue( that, value, callback );

    };

    const updateKeys = function( that, updaters, callback ) {

      let cache = getValue( that );

      let value = _.clone( cache );

      _.each( updaters, ( updater, key ) => {

        value = setKey( value, key, updater );

      } );

      if ( _.isEqual( value, cache ) ) { callback(); return; };

      setValue( that, value, callback );

    };


    return {

      getInitialMembers() {

        return { [ member ]: { stale: this, cache: undefined } };

      },

      componentDidMount() {

        this[ member ].stale = this;

      },

      componentWillUpdate( nextProps, nextState ) {

        this[ member ].stale = { props: nextProps, state: nextState };

      },

      componentDidUpdate() {

        this[ member ].stale = this;

      },

      [ `get${ method }` ]( key, defaultValue ) {

        let value = getValue( this );

        let result = getKey( value, key, defaultValue );

        return result;

      },

      [ `get${ method }s` ]( keys, defaultValue ) {

        let value = getValue( this );

        let result = _.transform( keys, ( result, key ) => {

          result[ key ] = getKey( value, key, defaultValue );

        }, {} );

        return result;

      },

      [ `update${ method }` ]( key, updater, callback ) {

        updateKey( this, key, updater, callback );

      },

      [ `update${ method }s` ]( updaters, callback ) {

        updateKeys( this, updaters, callback );

      },

      [ `set${ method }` ]( key, value, callback ) {

        let updater = _.constant( value );

        updateKey( this, key, updater, callback );

      },

      [ `set${ method }s` ]( values, callback ) {

        let updaters = _.mapValues( values, ( value ) => _.constant( value ) );

        updateKeys( this, updaters, callback );

      },

      [ `toggle${ method }` ]( key, callback ) {

        let updater = _.negate( _.identity );

        updateKey( this, key, updater, callback );

      },

      [ `toggle${ method }s` ]( keys, callback ) {

        let updaters = _.transform( keys, ( updaters, key ) => { updaters[ key ] = _.negate( _.identity ) }, {} );

        updateKeys( this, updaters, callback );

      },

      [ `increase${ method }` ]( key, delta, callback ) {

        let updater = ( value ) => ( value || 0 ) + delta;

        updateKey( this, key, updater, callback );

      },

      [ `increase${ method }s` ]( deltas, callback ) {

        let updaters = _.mapValues( deltas, ( delta ) => ( value ) => ( value || 0 ) + delta );

        updateKeys( this, updaters, callback );

      },

      [ `default${ method }` ]( key, defaultValue, callback ) {

        let updater = ( value ) => _.defaultTo( value, defaultValue );

        updateKey( this, key, updater, callback );

      },

      [ `default${ method }s` ]( defaultValues, callback ) {

        let updaters = _.mapValues( defaultValues, ( defaultValue ) => ( value ) => _.defaultTo( value, defaultValue ) );

        updateKeys( this, updaters, callback );

      },

      [ `unset${ method }` ]( key, callback ) {

        let value = getValue( this );

        let path = _.toPath( key );

        let objectPath = _.dropRight( path );

        let objectKey = _.last( path );

        if ( ! _.has( value, objectPath.length ? objectPath : objectKey ) ) { callback(); return; };

        let updater = ( value ) => _.omit( value, objectKey );

        updateKey( this, objectPath, updater, callback );

      },

      [ `unset${ method }s` ]( keys, callback ) {

        let value = getValue( this );

        let updaters = _.transform( keys, ( updaters, key ) => {

          let path = _.toPath( key );

          let objectPath = _.dropRight( path );

          let objectKey = _.last( path );

          if ( ! _.has( value, objectPath.length ? objectPath : objectKey ) ) return;

          updaters[ objectPath.join( '.' ) ] = value => _.omit( value, objectKey );

        }, {} );

        updateKeys( this, updaters, callback );

      },

    };

  },

} );
