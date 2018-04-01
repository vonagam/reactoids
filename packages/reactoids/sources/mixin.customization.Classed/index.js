export default ClassedMixin = Mixin.create( {

  name: 'ClassedMixin',

  argTypes: {

    classes: PropTypes.object,

  },

  defaultArgs: {

    classes: {},

  },

  mixin( ARGS ) {

    const ID = _.uniqueId();


    const PATHS = [];

    const PATHS_LOOKUP = {};

    let NODES = {};

    const toPath = function( keys ) {

      return keys.join( '.' ); // TODO: tests changed "." to ""

    };

    const fillPaths = function( keys ) {

      let path = toPath( keys );

      PATHS.push( path );

      _.times( keys.length, ( i ) => {

        PATHS_LOOKUP[ toPath( keys.slice( i ) ) ] = path

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

      return _.mapKeys( classes, ( value, key ) => PATHS_LOOKUP[ key ] || key );

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


    const setPropsClasses = function( that, props ) {

      let classed = that._ClassedMixin;

      let propsClassName = props.className;

      propsClassName = _.funced( propsClassName, that );

      if ( _.isEqual( classed.propsClassName, propsClassName ) ) return false;

      classed.propsClassName = propsClassName;

      let propsClasses = classNameToClasses( propsClassName );

      if ( _.isEqual( classed.propsClasses, propsClasses ) ) return false;

      classed.propsClasses = propsClasses;

      return true;

    };

    const setContextClasses = function( that, context, props ) {

      let classed = that._ClassedMixin;

      let contextClassName = props.classNameContexted && _.funced( context.getClassNames, ID, that.constructor, PATHS, that );

      contextClassName = _.funced( contextClassName, that );

      if ( _.isEqual( classed.contextClassName, contextClassName ) ) return false;

      classed.contextClassName = contextClassName;

      let contextClasses = classNameToClasses( contextClassName );

      if ( _.isEqual( classed.contextClasses, contextClasses ) ) return false;

      classed.contextClasses = contextClasses;

      return true;

    };

    const setClasses = function( that, props, context ) {

      let classed = that._ClassedMixin;

      let propsHaveChanged = setPropsClasses( that, props );

      let contextHaveChanged = setContextClasses( that, context, props );

      if ( ! propsHaveChanged && ! contextHaveChanged ) return;

      classed.classes = mergeClasseses( classed.contextClasses, classed.propsClasses );

      classed.cache = {};

    };


    return {

      propTypes: {

        className: PropTypes.funced( PropTypes.object, PropTypes.string, PropTypes.array ), // ( that: mixed ) => object | string | Array< object | string >

        classNameContexted: PropTypes.bool,

      },

      defaultProps: {

        classNameContexted: true,

      },

      contextTypes: {

        getClassNames: PropTypes.func, // ( id: string, constructor: mixed, keys: Array< string >, instance: mixed ) => object | string | array

      },

      getInitialMembers() {

        return {

          _ClassedMixin: {

            cache: {},

            classes: {},

            propsClasses: {},

            propsClassName: undefined,

            contextClasses: {},

            contextClassName: undefined,

          },

        };

      },

      componentWillMount() {

        setClasses( this, this.props, this.context );

      },

      componentWillUpdate( nextProps, nextState, nextContext ) {

        setClasses( this, nextProps, nextContext );

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

        path = PATHS_LOOKUP[ path ] || path;

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
