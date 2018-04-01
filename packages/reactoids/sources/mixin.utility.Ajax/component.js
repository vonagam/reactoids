export default AjaxMixinComponent = Mixin.createClass( {

  displayName: 'AjaxMixinComponent',

  mixins: [

    AjaxMixin(),

    FuncedChildRenderMixin( {

      getChildArg( that ) {

        let { state } = that;

        return {

          ajaxes: state.ajaxes,

        };

      },

    } ),

  ],

} );
