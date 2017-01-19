# mixins

ScriptInjectorMixin = requireSource 'mixins/ScriptInjector'

NullRenderMixin = requireSource 'mixins/NullRender'


ScriptInjector = React.createClass {

  mixins: [

    ScriptInjectorMixin {

      'scripts': ( that )->= _.funced that.props.scripts, that

      'check': ( that )->= _.funced that.props.check, that

      'decorateScript': ( that, script )-> _.funced that.props.decorateScript, that, script

      'callback': ( that )-> _.funced that.props.callback, that

    }

    NullRenderMixin()

  ]

  propTypes: ScriptInjectorMixin.args

  getDefaultProps: ScriptInjectorMixin.defaults

}


module.exports = ScriptInjector
