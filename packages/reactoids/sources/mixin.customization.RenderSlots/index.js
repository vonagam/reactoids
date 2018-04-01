export default RenderSlotsMixin = Mixin.create( {

  name: 'RenderSlotsMixin',

  argTypes: {

    slots: PropTypes.objectOf( PropTypes.funced( PropTypes.node ) ),

  },

  mixin( ARGS ) {

    let mixin = {

      propTypes: {},

      defaultProps: {},

    };


    _.each( ARGS.slots, ( renderer, name ) => {

      let render = `render${ _.pascalCase( name ) }`;

      let props = name;


      mixin.propTypes[ render ] = PropTypes.funced( PropTypes.node ); // ( that: mixed, slotArgs: object, slotProps: object ) => React.Node

      mixin.defaultProps[ render ] = renderer;


      mixin.propTypes[ props ] = PropTypes.funced( PropTypes.object ); // ( that: mixed ) => object

      mixin.defaultProps[ props ] = {};


      mixin[ render ] = function( slotArgs ) {

        let slotProps = _.funced( this.props[ props ], this );

        return _.funced( this.props[ render ], this, slotArgs, slotProps );

      };

    } );


    return mixin;

  },

} );
