#§global 'FormData', 'window'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'
AjaxMixin = requireSource 'mixins/Ajax'
RenderSlotsMixin = requireSource 'mixins/RenderSlots'

Fields = requireSource 'components/inputs/Fields'
Button = requireSource 'components/general/Button'

toFormData = requireSource 'various/toFormData'


ComponentArgs = classes:

  '-readonly': ''
  '-waiting': ''
  'fields': ''
  'actions':
    'action': ''

RenderSlotsArgs = names: [ 'actions' ]


Form = React.createClass

  displayName: 'Form'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin, AjaxMixin, RenderSlotsMixin( RenderSlotsArgs ) ]

  propTypes:

    ajax: React.PropTypes.funced( React.PropTypes.object ).isRequired # ( that, value )->=
    scheme: React.PropTypes.funced( React.PropTypes.collection ).isRequired
    messages: React.PropTypes.object
    getErrors: React.PropTypes.func.isRequired # ( that, jqXHR )->=

  getDefaultProps: ->=

    defaultValue: {}
    getErrors: ( that, jqXHR )->= _.get jqXHR, 'responseJSON.errors'
    renderActions: ( that, slotProps, userProps )->=

      <Button
        {... userProps }
        className={ that.mergeClassNames slotProps.className, userProps.className }
        onClick={ that._queue that.submit, userProps.onClick }
      />

  getInitialState: ->=

    errors: {}

  onAjaxBefore: ->=

    @setState errors: {}

  onAjaxError: ( jqXHR )->

    errors = @props.getErrors this, jqXHR

    @setState errors: errors if errors

  submit: ->=

    return if @props.readOnly

    value = @getValue()

    ajax = _.cloneDeep _.funced @props.ajax, this, value

    ajax ||= {}

    ajax.data = _.merge {}, ajax.data, value

    ajax.beforeSend = _.queue @onAjaxBefore, ajax.beforeSend

    ajax.error = _.queue @onAjaxError, ajax.error

    ajax.success = _.queue @onAjaxSuccess, ajax.success

    unless _.isEmpty ajax.data

      data = toFormData ajax.data

      if data

        ajax.data = data
        ajax.processData = false
        ajax.contentType = false

    toFormData ajax unless _.isEmpty ajax.data

    @sendAjax 'one', ajax

  render: ->=

    { props, state, classed } = this

    messages = _.cloneDeep( props.messages ) || {}

    messages.errors = _.merge {}, messages.errors, state.errors

    readOnly = props.readOnly || state.ajaxes.one

    <div
      {... @omitProps() }
      className={ classed '.', '-waiting': state.ajaxes.one, '-readonly': readOnly }
    >
      <Fields
        {... @omitProps() }
        className={ classed 'fields' }
        scheme={ props.scheme }
        messages={ messages }
        value={ @getValue() }
        readOnly={ readOnly }
        onChange={ @setValue }
        onSubmit={ @submit }
      />
      <div className={ classed 'actions' }>
        {

          @renderActions( className: classed 'action' )

        }
      </div>
    </div>


module.exports = Form
