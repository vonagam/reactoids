Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'
RenderSlotsMixin = requireSource 'mixins/RenderSlots'


ComponentArgs = classes:

  '-readonly': ''
  '-focused': ''
  '-filled': ''
  'wrapper':
    'input': ''
  'message': ''

RenderSlotsArgs = names: [ 'before', 'after', 'insideBefore', 'insideAfter' ]


Field = React.createClass

  displayName: 'Field'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin, RenderSlotsMixin( RenderSlotsArgs ) ]

  propTypes:

    type: React.PropTypes.func.isRequired
    props: React.PropTypes.object
    messages: React.PropTypes.object
    onFocus: React.PropTypes.func
    onBlur: React.PropTypes.func
    onSubmit: React.PropTypes.func

  getDefaultProps: ->=

    renderMessages = ( that, slotProps, userProps )->= slotProps.messages

    props: {}
    renderBefore: renderMessages
    renderAfter: renderMessages
    renderInsideBefore: renderMessages
    renderInsideAfter: renderMessages

  getInitialState: ->=

    focus: false

  onLabelClick: ->

    @refs.input.onLabelClick()

  render: ->=

    Input = @props.type

    inputProps = @props.props

    value = @getValue()

    messages = {}

    _.each @props.messages, ( message, name )->

      message = _.funced message, value

      if _.isPlainObject message

        text = message.text
        props = message.props || {}
        position = message.position || 'after'

      else

        text = message
        props = {}
        position = 'after'

      return unless text

      messages[ position ] ||= []

      messages[ position ].push(

        <div
          key={ name }
          {... props }
          className={ @mergeClassNames @classed( 'message', "message.-#{ name }" ), props.className }
          onClick={ if name == 'label' then _.queue @onLabelClick, props.onClick else props.onClick }
        >
          {
            
            text
          
          }
        </div>

      )

    , this

    <div
      {... @omitProps() }
      className={ @classed '.', '-focused': @state.focus, '-filled': value != undefined && value != '' }
    >
      {
        
        @renderBefore messages: messages[ 'before' ]
      
      }
      <div className={ @classed 'wrapper' }>
        {
          
          @renderInsideBefore messages: messages[ 'insideBefore' ]
        
        }
        <Input
          ref='input'
          {... inputProps }
          className={ @mergeClassNames @classed( 'input', '-readonly': @props.readOnly ), inputProps.className }
          value={ value }
          readonly={ @props.readOnly }
          inputDelay={ -1 }
          onChange={ @setValue }
          onTempChange={ @setTempValue }
          onFocus={ @_queue @_bindary( @setState, @, focused: true ), @props.onFocus }
          onBlur={ @_queue @_bindary( @setState, @, focused: false ), @props.onBlur }
          onSubmit={ @props.onSubmit }
        />
        {
          
          @renderInsideAfter messages: messages[ 'insideAfter' ]
        
        }
      </div>
      {
        
        @renderAfter messages: messages[ 'after' ]
      
      }
    </div>


module.exports = Field
