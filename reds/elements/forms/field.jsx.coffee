classes = $require 'various/classes'
$require 'mixins/component'

Input = $require 'elements/inputs/input'
Checkboxer = $require 'elements/inputs/checkboxer'
Radigos = $require 'elements/inputs/radigos'
Select = $require 'elements/inputs/select'
Textarea = $require 'elements/inputs/textarea'

$define ->


  Field = React.createClass

    statics:

      INPUTS: {}

      MAPPINGS: []

      registerInput: ( Input, detection )->

        name = Input.displayName.toLowerCase()

        Field.INPUTS[ name ] = Input

        Field.MAPPINGS.push { detection: detection, type: name } if detection

        return

      getInputInfo: ( props )->

        return input: props.input if props.input

        return input: Field.INPUTS[ props.type ] if props.type

        for mapping in Field.MAPPINGS

          if input_props = mapping.detection props

            return input: Field.INPUTS[ mapping.type ], props: input_props

        return input: Field.INPUTS[ 'input' ]

    propTypes:

      name: React.PropTypes.string
      path: React.PropTypes.string
      type: React.PropTypes.string
      input: React.PropTypes.func
      messages: React.PropTypes.object
      onChange: React.PropTypes.func
      onFocus: React.PropTypes.func
      onBlur: React.PropTypes.func

    mixins: [ 'component' ]

    classes:
      'field':
        '-focused': ''
        '-filled': ''
        'input':
          'input': ''
        'message': ''

    getInitialState: ->

      focus: false
      value: @getValue()

    getValue: ->

      return @props.value if @props.value != undefined
      return @refs.input.getValue() if @refs.input
      return @props.defaultValue

    onChange: ( value )->

      @setState value: value if @state.value != value

      return

    onFocus: ->

      @setState focused: true

      return

    onBlur: ->

      @setState focused: false

      return

    onLabelClick: ->

      _.pass @refs.input.onLabelClick, arguments

      return

    render: ->

      input_info = Field.getInputInfo @props

      Input = input_info.input
      input_add_props = input_info.props

      value = @getValue()

      className = @classed '',
        '.-focused': @state.focus
        '.-filled': value != undefined && value != ''

      input_props = @omitProps [ 'id', 'className', Field ]

      messages = _.map @props.messages, ( text, name )->

        text = _.funced text, value

        return unless text

        `<div
          key={ name }
          data-message={ name }
          className={ this.classed( '.message' ) }
          onClick={ name == 'label' && this.onLabelClick }
        >
          { text }
        </div>`

      , this

      `<div
        id={ this.props.id }
        className={ className }
        data-name={ this.props.name }
        data-path={ this.props.path }
        data-type={ Input.displayName.toLowerCase() }
      >
        <div className={ this.classed( '.input' ) }>
          <Input
            ref='input'
            { ...input_props }
            { ...input_add_props }
            className={ this.classed( '.input.input' ) }
            onFocus={ _.queue( this.props.onFocus, this.onFocus ) }
            onBlur={ _.queue( this.props.onBlur, this.onBlur ) }
            onChange={ _.queue( this.props.onChange, this.onChange ) }
          />
        </div>
        { messages }
      </div>`


  Field.registerInput Input, ( props )->

    return true if props.sub_type
    return sub_type: 'email' if /email/.test props.name
    return sub_type: 'password' if /password/.test props.name
    return

  Field.registerInput Select, ( props )-> Boolean props.collection
  Field.registerInput Checkboxer, ( props )-> /(?:[\[_]|^)(?:is|are|not|do|has|have|had|need|must)(?:[\]_]|$)/.test props.name
  Field.registerInput Textarea, ( props )-> /(?:description|text)/.test props.name
  Field.registerInput Checkboxer
  Field.registerInput Radigos


  Field
