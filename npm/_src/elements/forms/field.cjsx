§require 'mixins/component'
§require 'mixins/input'
§require 'mixins/connect'
§require 'mixins/content_for'


Field = React.createClass

  displayName: 'Field'

  mixins: [ 'component', 'input', 'connect', 'content_for' ]

  classes:

    'field':
      '-readonly': ''
      '-focused': ''
      '-filled': ''
      'wrapper':
        'input': ''
      'message': ''

  propTypes:

    type: React.PropTypes.func.isRequired
    props: React.PropTypes.object
    messages: React.PropTypes.object
    onFocus: React.PropTypes.func
    onBlur: React.PropTypes.func
    onSubmit: React.PropTypes.func

  getDefaultProps: ->

    props: {}

  getInitialState: ->

    focus: false

  render: ->

    Input = @props.type

    input_props = @props.props

    value = @getValue()

    _.each @props.messages, ( data, name )->

      data = _.funced data, value

      if _.isPlainObject data

        content = data.content
        props = data.props || {}
        position = data.position || 'after'

      else

        content = data
        props = {}
        position = 'after'

      return unless content

      @contentFor( position,

        <div
          key={ name }
          {... props }
          className={ @mergeClassNames @classed( 'message', "message.-#{ name }" ), props.className }
          onClick={ _.queue( props.onClick, name == 'label' && @connect 'input', 'onLabelClick', true ) }
        >
          {

            content

          }
        </div>

      )

      return

    , this

    <div
      {... @omitProps() }
      className={

        @classed( '',

          '-focused': @state.focus
          '-filled': value != undefined && value != ''

        )

      }
    >
      {

        @contentFor 'before'
      
      }
      <div className={ @classed 'wrapper' }>
        { 
        
          @contentFor 'inside_before'
        
        }
        <Input
          ref='input'
          {... input_props }
          className={ @mergeClassNames @classed( 'input', '-readonly': @props.readonly ), input_props.className }
          value={ value }
          readonly={ @props.readonly }
          input_delay={ -1 }
          onChange={ @setValue }
          onTempChange={ @setTempValue }
          onFocus={ @_queue @_bindary( @setState, @, focused: true ), @props.onFocus }
          onBlur={ @_queue @_bindary( @setState, @, focused: false ), @props.onBlur }
          onSubmit={ @props.onSubmit }
        />
        {

          @contentFor 'inside_after'

        }
      </div>
      {
      
        @contentFor 'after'
      
      }
    </div>


§export Field
