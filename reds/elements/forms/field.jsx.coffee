$require 'mixins/component'
$require 'mixins/connector'
$require 'mixins/content_for'

Input = $require 'elements/inputs/input'
Checkboxer = $require 'elements/inputs/checkboxer'
Radigos = $require 'elements/inputs/radigos'
Select = $require 'elements/inputs/select'
Textarea = $require 'elements/inputs/textarea'

$define ->


  Field = React.createClass

    mixins: [ 'component', 'connector', 'content_for' ]

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

    classes:
      'field':
        '-focused': ''
        '-filled': ''
        'wrapper':
          'input': ''
        'message': ''

    getInitialState: ->

      focus: false
      value: @getValue()

    getValue: ->

      return @props.value if @props.value != undefined
      return @refs.input.getValue() if @refs?.input
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

    render: ->

      input_info = Field.getInputInfo @props

      Input = input_info.input
      input_add_props = input_info.props

      input_props = @omitProps [ 'id', Field ]

      value = @getValue()

      className = @classed '',
        '-focused': @state.focus
        '-filled': value != undefined && value != ''

      messages = _.each @props.messages, ( data, name )->

        data = _.funced data, value

        if _.isPlainObject data

          content = data.content
          position = data.position || 'after'

        else

          content = data
          position = 'after'

        return unless content

        @contentFor( position,

          `<div
            key={ name }
            data-message={ name }
            className={ this.classed( 'message', 'message.-' + name ) }
            onClick={ name == 'label' && this.connect( 'input', 'onLabelClick', true ) }
          >
            { content }
          </div>`

        )

        return

      , this

      `<div
        id={ this.props.id }
        className={ className }
        data-name={ this.props.name }
        data-path={ this.props.path }
        data-type={ Input.displayName.toLowerCase() }
      >
        { this.contentFor( 'before' ) }
        <div className={ this.classed( 'wrapper' ) }>
          { this.contentFor( 'inside_before' ) }
          <Input
            ref='input'
            { ...input_props }
            { ...input_add_props }
            className={ this.classed( 'input' ) }
            onFocus={ _.queue( this.props.onFocus, this.onFocus ) }
            onBlur={ _.queue( this.props.onBlur, this.onBlur ) }
            onChange={ _.queue( this.props.onChange, this.onChange ) }
          />
          { this.contentFor( 'inside_after' ) }
        </div>
        { this.contentFor( 'after' ) }
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
