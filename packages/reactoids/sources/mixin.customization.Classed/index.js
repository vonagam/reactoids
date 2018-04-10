export default ClassedMixin = Mixin.create( {

  name: 'ClassedMixin',

  argTypes: {

    classes: PropTypes.object,

  },

  defaultArgs: {

    classes: {},

  },

  mixin( ARGS ) {

    const PATHS = {};

    let NODES = {};

    const toPath = function( keys ) {

      return keys.join( '.' );

    };

    const fillPaths = function( keys ) {

      let path = toPath( keys );

      _.times( keys.length, ( i ) => {

        let shortcut = toPath( keys.slice( i ) );

        if ( PATHS[ shortcut ] && PATHS[ shortcut ].split( '.' ).length < path.split( '.' ).length ) return;

        PATHS[ shortcut ] = path;

      } );

    };

    const fillNodes = function( value, keys ) {

      let path = toPath( keys );

      fillPaths( keys );

      NODES[ path ] = {};

      if ( _.isObject( value ) ) {

        _.each( value, ( value, key ) => {

          if ( key[ 0 ] === '-' ) {

            if ( key[ key.length - 1 ] === '=' ) {

              _.defaults( NODES[ path ], { options: [] } );

              NODES[ path ].options.push( key.replace( /(^-|=$)/g, '' ) );

              fillPaths( keys.concat( key ) );

              _.each( value, ( value ) => {

                fillPaths( keys.concat( key + value ) );

              } );

            } else {

              _.defaults( NODES[ path ], { booleans: [] } );

              NODES[ path ].booleans.push( key.replace( /^-/g, '' ) );

              fillPaths( keys.concat( key ) );

              fillPaths( keys.concat( '!' + key ) );

            }

          } else {

            fillNodes( value, keys.concat( key ) );

          }

        } );

      }

    };

    fillNodes( ARGS.classes, [] );

    NODES = _.mapValues( NODES, ( node, path ) => {

      let { booleans, options } = node;

      let prefix = path === '' ? '' : path + '.';

      return function( classes, modifiers ) {

        let classNames = [ classes[ path ] ];

        _.each( booleans, ( boolean ) => {

          classNames.push( classes[ `${ prefix }${ modifiers[ boolean ] ? '' : '!' }-${ boolean }` ] );

        } );

        _.each( options, ( option ) => {

          classNames.push( classes[ `${ prefix }-${ option }=${ modifiers[ option ] ? modifiers[ option ] : '' }` ] );

        } );

        return classNames;

      };

    } );


    const mergeClassNames = function() {

      let classNames = _.compact( _.flattenDeep( arguments ) );

      if ( classNames.length < 2 ) return classNames[ 0 ];

      if ( _.every( classNames, _.isString ) ) return classNames.join( ' ' );

      return classNames;

    };

    const mapClassesKeys = function( classes ) {

      return _.mapKeys( classes, ( value, key ) => PATHS[ key ] || key );

    };

    const mergeClasseses = function() {

      let classeses = _.flattenDeep( arguments );

      let args = [].concat( {}, classeses, ( a, b ) => mergeClassNames( a, b ) );

      return _.mergeWith.apply( undefined, args );

    };

    const classNameToClasses = function( className ) {

      if ( ! className ) return undefined;

      if ( ! _.isObject( className ) ) return { '': className };

      if ( _.isArray( className ) ) return mergeClasseses( _.map( className, classNameToClasses ) );

      return mapClassesKeys( className );

    };


    const updateClasses = function( that, props ) {

      let classed = that._ClassedMixin;

      let className = _.funced( props.className, that );

      if ( _.isEqual( classed.className, className ) ) return;

      classed.className = className;

      let classes = classNameToClasses( className ) || {};

      if ( _.isEqual( classed.classes, classes ) ) return;

      classed.classes = classes;

      classed.cache = {};

    };


    return {

      propTypes: {

        className: PropTypes.funced( PropTypes.object, PropTypes.string, PropTypes.array ), // ( that: mixed ) => object | string | Array< object | string >

      },

      getInitialMembers() {

        return {

          _ClassedMixin: {

            className: undefined,

            classes: {},

            cache: {},

          },

        };

      },

      componentWillMount() {

        updateClasses( this, this.props );

      },

      componentWillUpdate( nextProps ) {

        updateClasses( this, nextProps );

      },

      mergeClassNames() {

        return mergeClassNames( arguments );

      },

      classed( path, modifiers = {} ) {

        let { cache, classes } = this._ClassedMixin;

        let cacheKey = path;

        _.each( modifiers, ( value, key ) => {

          cacheKey += ` ${ key }:${ value }`;

        } );

        if ( _.hasOwn( cache, cacheKey ) ) return cache[ cacheKey ];

        path = PATHS[ path ] || path;

        let result = (

          NODES[ path ] ?

            mergeClassNames( NODES[ path ]( classes, modifiers ) )

          :

            classes[ path ]

        );

        cache[ cacheKey ] = result;

        return result;

      },

    };

  },

} );
