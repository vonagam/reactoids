export default RenderPropMixin = Mixin.create( {

  name: 'RenderPropMixin',

  argTypes: {

    getRenderArg: PropTypes.func, // ( that: mixed ) => mixed

  },

  defaultArgs: {

    getRenderArg: _.noop,

  },

  mixin( ARGS ) {

    return {

      propTypes: {

        children: PropTypes.funced( PropTypes.node ), // ( that: mixed, renderArg: mixed ) => React.Node

      },

      render() {

        let children = _.funced( this.props.children, this, ARGS.getRenderArg( this ) );

        return children;

      },

    };

  },

} );
