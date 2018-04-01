export default BaseAsyncKeyMixin = Mixin.create( {

  name: 'BaseAsyncKeyMixin',

  argTypes: {

    name: PropTypes.string,

    get: PropTypes.func, // ( that: mixed, props: object, state: object ) => Promise<mixed>

    set: PropTypes.func, // ( that: mixed, value: mixed ) => Promise

  },

  mixin( ARGS ) {

    const method = _.pascalCase( `${ ARGS.name }Key` );

    const member = `_${ _.pascalCase( ARGS.name ) }KeyMixin`;


    const getValue = async function( that ) {

      if ( that[ member ].stale ) {

        that[ member ].cache = await ARGS.get( that, that[ member ].stale.props, that[ member ].stale.state );

        delete that[ member ].stale;

      }

      return that[ member ].cache;

    };

    const setValue = async function( that, value ) {

      that[ member ].cache = value;

      delete that[ member ].cache;

      await ARGS.set( that, value );

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

    const updateKey = async function( that, key, updater ) {

      let cache = await getValue( that );

      let value = _.clone( cache );

      value = setKey( value, key, updater );

      if ( _.isEqual( value, cache ) ) return;

      await setValue( that, value );

    };

    const updateKeys = async function( that, updaters ) {

      let cache = await getValue( that );

      let value = _.clone( cache );

      _.each( updaters, ( updater, key ) => {

        value = setKey( value, key, updater );

      } );

      if ( _.isEqual( value, cache ) ) return;

      await setValue( that, value );

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

      async [ `get${ method }` ]( key, defaultValue ) {

        let value = await getValue( this );

        let result = getKey( value, key, defaultValue );

        return result;

      },

      async [ `get${ method }s` ]( keys, defaultValue ) {

        let value = await getValue( this );

        let result = _.transform( keys, ( result, key ) => {

          result[ key ] = getKey( value, key, defaultValue );

        }, {} );

        return result;

      },

      async [ `update${ method }` ]( key, updater ) {

        await updateKey( this, key, updater );

      },

      async [ `update${ method }s` ]( updaters ) {

        await updateKeys( this, updaters );

      },

      async [ `set${ method }` ]( key, value ) {

        let updater = _.constant( value );

        await updateKey( this, key, updater );

      },

      async [ `set${ method }s` ]( values ) {

        let updaters = _.mapValues( values, ( value ) => _.constant( value ) );

        await updateKeys( this, updaters );

      },

      async [ `toggle${ method }` ]( key ) {

        let updater = _.negate( _.identity );

        await updateKey( this, key, updater );

      },

      async [ `toggle${ method }s` ]( keys ) {

        let updaters = _.transform( keys, ( updaters, key ) => { updaters[ key ] = _.negate( _.identity ) }, {} );

        await updateKeys( this, updaters );

      },

      async [ `increase${ method }` ]( key, delta ) {

        let updater = ( value ) => ( value || 0 ) + delta;

        await updateKey( this, key, updater );

      },

      async [ `increase${ method }s` ]( deltas ) {

        let updaters = _.mapValues( deltas, ( delta ) => ( value ) => ( value || 0 ) + delta );

        await updateKeys( this, updaters );

      },

      async [ `default${ method }` ]( key, defaultValue ) {

        let updater = ( value ) => _.defaultTo( value, defaultValue );

        await updateKey( this, key, updater );

      },

      async [ `default${ method }s` ]( defaultValues ) {

        let updaters = _.mapValues( defaultValues, ( defaultValue ) => ( value ) => _.defaultTo( value, defaultValue ) );

        await updateKeys( this, updaters );

      },

      async [ `unset${ method }` ]( key ) {

        let value = await getValue( this );

        let path = _.toPath( key );

        let objectPath = _.dropRight( path );

        let objectKey = _.last( path );

        if ( ! _.has( value, objectPath.length ? objectPath : objectKey ) ) return;

        let updater = ( value ) => _.omit( value, objectKey );

        await updateKey( this, objectPath, updater );

      },

      async [ `unset${ method }s` ]( keys ) {

        let value = await getValue( this );

        let updaters = _.transform( keys, ( updaters, key ) => {

          let path = _.toPath( key );

          let objectPath = _.dropRight( path );

          let objectKey = _.last( path );

          if ( ! _.has( value, objectPath.length ? objectPath : objectKey ) ) return;

          updaters[ objectPath.join( '.' ) ] = value => _.omit( value, objectKey );

        }, {} );

        await updateKeys( this, updaters );

      },

    };

  },

} );
