export default ToggleMixin = Mixin.create( {

  name: 'ToggleMixin',

  argTypes: {

    name: PropTypes.string,

    toggle: PropTypes.func, // ( that: mixed, bool: boolean ) => void

    checks: PropTypes.shape( {

      componentWillMount: PropTypes.funced( PropTypes.bool ), // ( that: mixed ) => boolean?

      componentDidMount: PropTypes.funced( PropTypes.bool ), // ( that: mixed ) => boolean?

      componentWillReceiveProps: PropTypes.funced( PropTypes.bool ), // ( that: mixed, props: object ) => boolean?

      componentWillUpdate: PropTypes.funced( PropTypes.bool ), // ( that: mixed, props: object, state: object ) => boolean?

      componentDidUpdate: PropTypes.funced( PropTypes.bool ), // ( that: mixed, props: object, state: object ) => boolean?

    } ),

  },

  defaultArgs: {

    name: '',

    checks: {},

  },

  mixin( ARGS ) {

    assert( () => {

      let unknownChecks = _.difference( _.keys( ARGS.checks ), [ 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate' ] );

      if ( unknownChecks.length > 0 ) {

        throw new Error( `ToggleMixin: Mixin "${ ARGS.name }" has some unknown hook checks "${ unknownChecks.join( '", "' ) }"` );

      }

    } );


    const member = `_${ _.pascalCase( ARGS.name ) }ToggleMixin`;

    const method = `${ _.pascalCase( ARGS.name ) }Toggle`;


    const toggleInstance = function( instance, bool ) {

      if ( bool !== ! instance[ member ] ) return;

      instance[ member ] = Boolean( bool );

      ARGS.toggle( instance, bool );

    };


    let mixin = {

      getInitialMembers() {

        return { [ member ]: false };

      },

      componentWillUnmount() {

        toggleInstance( this, false );

      },

      [ `is${ method }d` ]() {

        return this[ member ];

      },

    };


    _.assign( mixin, _.mapValues( ARGS.checks, ( check, name ) => {

      if ( _.isBoolean( check ) ) {

        check = _.constant( check );

      }

      return function( ...args ) {

        toggleInstance( this, check( this, ...args ) );

      };

    } ) );


    return mixin;

  },

} );
