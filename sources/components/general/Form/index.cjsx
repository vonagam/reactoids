# mixins

AjaxMixin = requireSource 'mixins/Ajax'

FuncedChildRenderMixin = requireSource 'mixins/FuncedChildRender'


Form = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin()

    AjaxMixin()

    FuncedChildRenderMixin {

      getChildArg: ( that )->=

        { state } = that


        'results': state.results

        'submitting': state.ajaxes.submit

      ##

    }

  ]

  propTypes: {

    'ajax': React.PropTypes.funced( React.PropTypes.object ).isRequired # ( that )->=

    'getSubmitResults': React.PropTypes.func.isRequired # ( that, jqXHR )->=

    'onSubmit': React.PropTypes.func # ->

    'onComplete': React.PropTypes.func # ( results )->

  }

  getDefaultProps: ->=

    'getSubmitResults': _.noop

  ##

  getInitialState: ->=

    'results': undefined

  ##

  submit: ->

    ajax = _.clone _.funced @props.ajax, this

    return if _.isEmpty ajax

    ajax.beforeSend = _.queue @onAjaxBefore, ajax.beforeSend

    ajax.complete = _.queue @onAjaxComplete, ajax.complete

    @sendAjax 'submit', ajax

  ##

  onAjaxBefore: ->=

    @setState results: undefined

    _.funced @props.onSubmit

  ##

  onAjaxComplete: ( jqXHR )->

    results = @props.getSubmitResults this, jqXHR

    @setState results: results

    _.funced @props.onComplete, results

  ##

}


module.exports = Form
