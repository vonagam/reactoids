export default OmitPropsMixin = Mixin.create( {

  name: 'OmitPropsMixin',

  mixin: _.once( () => {

    return {

      propTypes: {

        omitProps: PropTypes.arrayOf( PropTypes.string ),

      },

      omitProps() {

        let keys = _.keys( this.constructor.propTypes );


        this.omitProps = function() {

          return _.omit( this.props, keys, this.props.omitProps );

        };


        return this.omitProps();

      },

    };

  } ),

} );
