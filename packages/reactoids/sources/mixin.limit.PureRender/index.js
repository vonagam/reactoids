export default PureRenderMixin = Mixin.create( {

  name: 'PureRenderMixin',

  argTypes: {

    purifiedPaths: PropTypes.arrayOf( PropTypes.string ),

    dirtiedPaths: PropTypes.arrayOf( PropTypes.string ),

  },

  defaultArgs: {

    purifiedPaths: undefined,

    dirtiedPaths: undefined,

  },

  mixin: ( ARGS ) => {

    let mixin = {};


    let customizer = function( a, b ) {

      if ( a === b ) return true;

      if ( _.isFunction( a ) && _.isFunction( b ) ) {

        if ( a._args && b._args && a._method === b._method ) {

          return _.isEqualWith( a._args, b._args, customizer );

        }

        return false;

      }

      return undefined;

    };

    mixin.shouldComponentUpdate = function( nextProps, nextState ) {

      let before = { props: this.props, state: this.state };

      let after = { props: nextProps, state: nextState };

      let should = ! _.isEqualOmitWith( before, after, ARGS.purifiedPaths, customizer );

      if ( ! should && ARGS.dirtiedPaths ) {

        should = _.some( ARGS.dirtiedPaths, ( path ) => _.isFunction( _.get( after, path ) ) );

      }

      return should;

    };


    _.each( {

      _bind: _.bind,

      _partial: _.partial,

      _ary: _.ary,

      _queue: _.queue,

    }, ( method, name ) => {

      mixin[ name ] = function() {

        let result = method.apply( null, arguments );

        result._method = method;

        result._args = arguments;

        return result;

      };

    } );


    let mixin_queue = mixin._queue;

    mixin._queue = function() {

      let funcs = _.filter( arguments, _.isFunction );

      if ( funcs.length < 2 ) return funcs[ 0 ];

      return mixin_queue.apply( null, funcs );

    };


    return mixin;

  },

} );
