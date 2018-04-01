export default StateKeyMixinComponent = Mixin.createClass( {

  displayName: 'StateKeyMixinComponent',

  mixins: [

    StateKeyMixin(),

    RenderPropMixin(),

  ],

  propTypes: {

    initialState: PropTypes.object,

  },

  getInitialState() {

    return this.props.initialState;

  },

} );
