export default BaseViewMixinComponent = Mixin.createClass( {

  displayName: 'BaseViewMixinComponent',

  mixins: [

    BaseViewMixin( {

      filterLink( that, link ) {

        return that.props.filterLink( that, link );

      },

      handleLink( that, link ) {

        return that.props.handleLink( that, link );

      },

      filterForm( that, form ) {

        return that.props.filterForm( that, form );

      },

      handleForm( that, form ) {

        return that.props.handleForm( that, form );

      },

    } ),

    RenderPropMixin(),

  ],

  propTypes: BaseViewMixin.argTypes,

  defaultProps: BaseViewMixin.defaultArgs,

} );
