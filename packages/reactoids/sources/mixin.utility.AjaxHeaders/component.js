export default AjaxHeadersMixinComponent = Mixin.createClass( {

  displayName: 'AjaxHeadersMixinComponent',

  mixins: [

    AjaxHeadersMixin( {

      headers( that, options ) {

        return _.funced( that.props.headers, that, options );

      },

      filterRequest( that, options ) {

        return that.props.filterRequest( that, options );

      },

    } ),

  ],

  propTypes: AjaxHeadersMixin.argTypes,

  defaultProps: AjaxHeadersMixin.defaultArgs,

  render: _.constant( null ),

} );
