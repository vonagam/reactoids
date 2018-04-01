export default ClassedContextMixin = Mixin.create( {

  name: 'ClassedContextMixin',

  argTypes: {

    getClassNames: PropTypes.func, // ( that: mixed, constructor: mixed, keys: array, instance: mixed ) => object | array | string

    getMemoiseKey: PropTypes.func, // ( that: mixed, constructor: mixed, keys: array, instance: mixed ) => string

    contextHandling: PropTypes.oneOf( [ 'ignore', 'combine', 'overlap' ] ),

  },

  defaultArgs: {

    getMemoiseKey: _.constant( '' ),

    contextHandling: 'ignore',

  },

  mixin( ARGS ) {

    const getClassNames = _.memoize(

      ( id, that, constructor, keys, instance ) => ARGS.getClassNames( that, constructor, keys, instance ),

      ( id, that, constructor, keys, instance ) => `${ ARGS.getMemoiseKey( that, constructor, keys, instance ) }:${ id }`,

    );


    const contextTypes = (

      ARGS.contextHandling === 'ignore' ?

        undefined

      :

        { getClassNames: PropTypes.func }

    );


    const getChildContext = (

      ARGS.contextHandling === 'ignore' ?

        _.once( function() {

          return {

            getClassNames: function( id, constructor, keys, instance ) {

              return getClassNames( id, this, constructor, keys, instance );

            },

          };

        } )

      :

        _.once( function() {

          return {

            getClassNames: function( id, constructor, keys, instance ) {

              let contextClassNames = _.funced( this.context.getClassNames, id, constructor, keys, instance );

              let ourClassNames = getClassNames( id, this, constructor, keys, instance );

              switch ( ARGS.contextHandling ) {

                case 'combine': return [ contextClassNames, ourClassNames ];

                case 'overlap': return _.assign( {}, contextClassNames, ourClassNames );

              }

            },

          };

        } )

    );


    return {

      contextTypes,

      childContextTypes: {

        getClassNames: PropTypes.func, // ( id: string, constructor: mixed, keys: array, instance: mixed ) => object | array | string

      },

      getChildContext,

    };

  },

} );
