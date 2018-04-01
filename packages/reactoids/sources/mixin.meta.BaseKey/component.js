export default BaseKeyMixinComponent = Mixin.createClass( {

  displayName: 'BaseKeyMixinComponent',

  mixins: [

    BaseKeyMixin( {

      name: '',

      get( that, props, state ) {

        return that.props.get( that, props, state );

      },

      set( that, value, callback ) {

        return that.props.set( that, value, callback );

      },

    } ),

    RenderPropMixin(),

  ],

  propTypes: {

    get: PropTypes.func, // ( that: mixed, props: object, state: object ) => mixed

    set: PropTypes.func, // ( that: mixed, value: mixed, callback: () => void ) => void

  },

} );
