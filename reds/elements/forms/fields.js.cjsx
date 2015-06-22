$require 'mixins/component'
$require 'mixins/input'

Field = $require 'elements/forms/field'


Fields = React.createClass

  displayName: 'Fields'

  mixins: [ 'component', 'input' ]

  classes:

    'fields':
      '-readonly': ''
      'field': ''

  propTypes:

    scheme: React.PropTypes.collection.isRequired
    messages: React.PropTypes.object
    onSubmit: React.PropTypes.func

  getDefaultProps: ->

    default_value: {}
    messages: {}

  onChange: ( path, value )->

    current_value = _.clone @getValue()

    current_value[ path ] = value

    @setValue current_value

    return

  render: ->

    value = @getValue()

    <div
      {... @omitProps() }
      className={ @classed '' }
    >
      {

        _.map @props.scheme, ( field, key )->

          key = field.key || key

          messages = _.mapValues @props.messages, key

          _.merge messages, field.messages

          <Field
            key={ key }
            className={ @mergeClassNames @classed( 'field', '-readonly': @props.readonly ), field.className }
            type={ field.type }
            props={ field.props }
            value={ value[ key ] }
            messages={ messages }
            readonly={ @props.readonly || field.readonly }
            onChange={ @_queue @_partial( @onChange, key ), field.onChange }
            onSubmit={ @_queue @props.onSubmit, field.onSubmit }
          />

        , this

      }
    </div>


$define -> Fields
