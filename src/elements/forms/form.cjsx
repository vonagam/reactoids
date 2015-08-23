§global 'FormData', 'window'

§require 'mixins/component'
§require 'mixins/input'
§require 'mixins/ajax_sender'
§require 'mixins/slots'
§require 'mixins/connect'

PropByPath = §require 'various/prop_by_path'
Fields = §require 'elements/forms/fields'
Button = §require 'elements/button'


Form = React.createClass

  displayName: 'Form'

  mixins: [ 'component', 'input', 'ajax_sender', 'connect', 'slots( "actions" )' ]

  classes:

    'form':
      '-readonly': ''
      '-waiting': ''
      'fields': ''
      'actions':
        'action': ''

  propTypes:

    scheme: React.PropTypes.funced( React.PropTypes.collection ).isRequired
    messages: React.PropTypes.object

  getDefaultProps: ->

    default_value: {}
    messages: {}
    renderActions: ( form, slot_props, user_props )->

      <Button
        {... user_props }
        className={ form.mergeClassNames slot_props.className, user_props.className }
        onClick={ form._queue form.submit, user_props.onClick }
      />

  getInitialState: ->

    errors: {}

  onAjaxBefore: ->

    @setState errors: {}

    return

  onAjaxError: ( jqXHR )->

    json = jqXHR.responseJSON

    return unless json && json.errors

    @setState errors: json.errors

    return

  onAjaxSuccess: ->

    @setValue undefined

    return

  toFormData: ( ajax )->

    return unless FormData

    data = new FormData

    flattened = PropByPath.flattened ajax.data, ( value )-> ! ( _.isArray( value ) || _.isPlainObject( value ) )

    _.each flattened, ( value, key )->

      key = key.replace /\.([^\.]+)/g, '[$1]'

      data.append key, value

      return

    ajax.data = data
    ajax.processData = false
    ajax.contentType = false

    return

  getAjax: ->

    value = @getValue()

    ajax = _.cloneDeep _.funced @props.ajax, value

    ajax ||= {}

    ajax.data = _.merge {}, ajax.data, value

    ajax.beforeSend = @_queue @onAjaxBefore, ajax.beforeSend

    ajax.error = @_queue @onAjaxError, ajax.error

    ajax.success = @_queue @onAjaxSuccess, ajax.success

    @toFormData ajax

    ajax

  submit: ->

    return if @props.readonly

    @send()

    return

  render: ->

    messages = _.clone( @props.messages ) || {}

    messages.errors = _.merge {}, messages.errors, @state.errors

    readonly = @props.readonly || @state.ajax_requests.sended

    <div
      {... @omitProps() }
      className={ @classed '', '-waiting': @state.ajax_requests.sended, '-readonly': readonly }
    >
      <Fields
        {... @omitProps() }
        className={ @classed 'fields' }
        scheme={ @props.scheme }
        messages={ messages }
        value={ @getValue() }
        readonly={ readonly }
        onChange={ @setValue }
        onSubmit={ @submit }
      />
      <div className={ @classed 'actions' }>
        {

          @actions( className: @classed 'action' )

        }
      </div>
    </div>


§export Form
