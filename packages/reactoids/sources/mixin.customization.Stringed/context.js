export default StringedContextMixin = Mixin.create( {

  name: 'StringedContextMixin',

  argTypes: {

    getStrings: PropTypes.func, // ( that: mixed, constructor: mixed, keys: array, instance: mixed ) => object | array

    getMemoiseKey: PropTypes.func, // ( that: mixed, constructor: mixed, keys: array, instance: mixed ) => string

    contextHandling: PropTypes.oneOf( [ 'ignore', 'overlap' ] ),

  },

  defaultArgs: {

    getMemoiseKey: _.constant( '' ),

    contextHandling: 'ignore',

  },

  mixin( ARGS ) {

    const getStrings = _.memoize(

      ( id, that, constructor, keys, instance ) => ARGS.getStrings( that, constructor, keys, instance ),

      ( id, that, constructor, keys, instance ) => `${ ARGS.getMemoiseKey( that, constructor, keys, instance ) }:${ id }`,

    );


    const contextTypes = (

      ARGS.contextHandling === 'ignore' ?

        undefined

      :

        { getStrings: PropTypes.func }

    );


    const getChildContext = (

      ARGS.contextHandling === 'ignore' ?

        _.once( function() {

          return {

            getStrings: function( id, constructor, keys, instance ) {

              return getStrings( id, this, constructor, keys, instance );

            },

          };

        } )

      :

        _.once( function() {

          return {

            getStrings: function( id, constructor, keys, instance ) {

              let contextStrings = _.funced( this.context.getStrings, id, constructor, keys, instance );

              let ourStrings = getStrings( id, this, constructor, keys, instance );

              return _.flatten( [ contextStrings, ourStrings ] );

            },

          };

        } )

    );


    return {

      contextTypes,

      childContextTypes: {

        getStrings: PropTypes.func, // ( id: string, constructor: mixed, keys: array, instance: mixed ) => object | array

      },

      getChildContext,

    };

  },

} );
