export default ScriptInjectorMixinComponent = Mixin.createClass( {

  displayName: 'ScriptInjectorMixinComponent',

  mixins: [

    ScriptInjectorMixin( {

      scripts( that ) {

        return _.funced( that.props.scripts, that );

      },

      filterScript( that, script ) {

        return _.funced( that.props.filterScript, that, script );

      },

      decorateScript( that, script ) {

        return _.funced( that.props.decorateScript, that, script );

      },

      callback( that ) {

        return _.funced( that.props.callback, that );

      },

    } ),

    ConstantPropsMixin( {

      keys: _.keys( ScriptInjectorMixin.argTypes ),

    } ),

  ],

  propTypes: ScriptInjectorMixin.argTypes,

  defaultProps: ScriptInjectorMixin.defaultArgs,

  render: _.constant( null ),

} );
