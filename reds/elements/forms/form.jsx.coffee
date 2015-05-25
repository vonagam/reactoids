Sender = $require 'elements/sender'
Fields = $require 'elements/forms/fields'
Button = $require 'elements/button'
PropByPath = $require 'various/prop_by_path'
$require 'mixins/component'
$require 'mixins/connector'

$define ->


  Form = React.createClass

    propTypes:

      ajax: React.PropTypes.funced React.PropTypes.object
      scheme: React.PropTypes.funced( React.PropTypes.array, React.PropTypes.object ).isRequired
      defaults: React.PropTypes.funced React.PropTypes.object
      button: React.PropTypes.object

    mixins: [ 'component', 'connector' ]

    classes:
      'form':
        'fields': ''
        'button': ''

    getDefaultProps: ->

      defaults: {}

    getInitialState: ->

      values: {}
      errors: {}

    onChange: ( path, value )->

      values = @state.values

      values[ path ] = value

      @setState values: values

      return

    onAjaxBefore: ->

      @setState errors: {}

      return

    onAjaxError: ( jqXHR )->

      json = jqXHR.responseJSON

      return unless json

      @setState errors: PropByPath.flattened json.errors, _.isArray

      return

    onAjaxSuccess: ->

      @setState @getInitialState()

      return

    toFormData: ( ajax )->

      return unless window.FormData

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

      values = @refs.fields.getValues()

      ajax = _.cloneDeep _.funced @props.ajax, values

      ajax ||= {}

      ajax.data = _.merge {}, ajax.data, values

      ajax.beforeSend = _.queue @onAjaxBefore, ajax.beforeSend

      ajax.error = _.queue @onAjaxError, ajax.error

      ajax.success = _.queue @onAjaxSuccess, ajax.success

      @toFormData ajax

      ajax

    render: ->

      errors = @state.errors

      values = _.defaults {}, @state.values, @props.defaults

      scheme = _.map _.funced( @props.scheme, values ), ( field )->

        field = _.clone field

        field.messages = _.mapValues field.messages, ( message )->

          _.funced message, field.value, values

        field.messages.error = errors[ field.path ]

        field.value = values[ field.path ]

        field

      is_ready = _.all scheme, ( field )-> ! field.messages.invalid

      button = @props.button

      `<Sender
        ref='sender'
        { ...this.omitProps() }
        ajax={ this.getAjax }
        is_ready={ is_ready }
        className={ this.classed( '' ) }
      >
        <Fields
          ref='fields'
          scheme={ scheme }
          onChange={ this.onChange }
          onSubmit={ this.connect( 'sender', 'send' ) }
          className={ this.classed( 'fields' ) }
        />
        <Button
          { ...button }
          className={ this.mergeClassNames( this.classed( 'button' ), button.className ) }
          onClick={ _.queue( button.onClick, this.connect( 'sender', 'send' ) ) }
        />
      </Sender>`
