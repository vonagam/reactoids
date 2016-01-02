Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'

Field = requireSource 'components/inputs/Field'


ComponentArgs = classes:

  '-readonly': ''
  'field': ''


Fields = React.createClass

  displayName: 'Fields'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin ]

  propTypes:

    scheme: React.PropTypes.funced( React.PropTypes.collection ).isRequired
    messages: React.PropTypes.object
    onSubmit: React.PropTypes.func

  getDefaultProps: ->=

    defaultValue: {}
    messages: {}

  onChange: ( key, val )->

    value = _.cloneDeep @getValue()

    _.set value, key, val

    @setValue value

  render: ->=

    { props, classed } = this

    value = @getValue()

    <div
      {... @omitProps() }
      className={ classed '.' }
    >
      {

        _.map _.funced( props.scheme, value ), ( field, key )->=

          key = field.key || key

          messages = _.mapValues props.messages, key

          <Field
            key={ key }
            className={ @mergeClassNames classed( 'field', '-readonly': props.readOnly ), field.className }
            type={ field.type }
            props={ field.props }
            value={ _.get value, key }
            messages={ _.merge messages, field.messages }
            readonly={ props.readOnly || field.readonly }
            onChange={ @_queue @_partial( @onChange, key ), field.onChange }
            onSubmit={ @_queue props.onSubmit, field.onSubmit }
          />

        , this

      }
    </div>


module.exports = Fields
