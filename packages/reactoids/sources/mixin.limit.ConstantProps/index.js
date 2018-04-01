export default  ConstantPropsMixin = Mixin.create( {

  name: 'ConstantPropsMixin',

  argTypes: {

    keys: PropTypes.arrayOf( PropTypes.string ),

  },

  mixin( ARGS ) {

    assert( () => {

      return {

        componentWillUpdate( nextProps ) {

          if ( ! _.isEqualPick( this.props, nextProps, ARGS.keys ) ) {

            throw new Error( `ConstantPropsMixin: some of "${ ARGS.keys.join( '", "' ) }" props have changed, they must stay the same` );

          }

        },

      };

    } );

    return {};

  },

} );
