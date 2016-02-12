# dependencies

requireDependency 'trix'


EVENTS = [

  'initialize'
  'selection-change'
  'focus'
  'blur'
  'file-accept'
  'attachment-add'
  'attachment-remove'

]


Trix = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes:

        '-readonly': ''
        '-focus': ''
        'editor': ''
        'toolbar': ''

      ##

    ##

    InputMixin

  ]

  propTypes:

    'onInitialize': React.PropTypes.func

    'onSelectionChange': React.PropTypes.func

    'onFocus': React.PropTypes.func

    'onBlur': React.PropTypes.func

    'onFileAccept': React.PropTypes.func

    'onAttachmentAdd': React.PropTypes.func

    'onAttachmentRemove': React.PropTypes.func

  ##

  getDefaultProps: ->=

    'defaultValue': ''

  ##

  getInitialState: ->=

    focus: 0

  ##

  componentWillMount: ->

    @trixId = _.uniqueId 'trixId'

  ##

  onChange: ( event )->

    @setTempValue event.target.value

    @syncEditorValue() if @props.readOnly

  ##

  onBlur: ( event )->

    @setValue event.target.value

  ##

  onFocusChange: ( delta )->

    @setState focus: @state.focus + delta

  ##

  syncEditorValue: ->

    editor = @editor

    prevDoc = editor.getDocument()

    value = @getValue()

    nextDoc = window.Trix.deserializeFromContentType value, 'text/html'

    return if nextDoc.isEqualTo prevDoc

    editor.loadDocument nextDoc

  ##

  componentDidMount: ->

    editor = @dom 'editor'

    toolbar = @dom 'toolbar'

    _.each EVENTS, ( event )->

      editor.addEventListener "trix-#{ event }", @callback "props.#{ _.camelCase "on-#{ event }" }"

    , this

    editor.addEventListener 'trix-change', @onChange

    editor.addEventListener 'trix-blur', @onBlur

    editor.addEventListener 'trix-file-accept', _.bind ( ( event )-> ! @props.onAttachmentAdd && event.preventDefault() ), this

    editor.addEventListener 'keydown', _.bind ( ( event )-> @props.readOnly && event.preventDefault() ), this

    editor.addEventListener 'trix-focus', _.partial @onFocusChange, +1

    editor.addEventListener 'trix-blur', _.partial @onFocusChange, -1

    editor.addEventListener 'trix-toolbar-dialog-show', _.partial @onFocusChange, +1

    editor.addEventListener 'trix-toolbar-dialog-hide', _.partial @onFocusChange, -1

    toolbar.addEventListener 'mousedown', ( event )-> event.target.tagName == 'DIV' && event.preventDefault()

    @editor = editor.editor

    @syncEditorValue()

  ##

  componentDidUpdate: ( prevProps, prevState )->

    return if _.isEqual @getValue(), @getValue( prevProps, prevState )

    @syncEditorValue()

  ##

  render: ->=

    { props, state, classed } = this


    <div {... @omitProps() } className={ classed '.', '-focus': state.focus > 0, '-readonly': props.readOnly }>

      <input id={ "#{ @trixId }_input" } type='hidden' />

      <trix-toolbar

        ref='toolbar'

        id={ "#{ @trixId }_toolbar" }

        class={ classed 'toolbar' }

      />

      <trix-editor

        ref='editor'

        class={ classed 'editor' }

        input={ "#{ @trixId }_input" }

        toolbar={ "#{ @trixId }_toolbar" }

      />

    </div>

  ##

##


module.exports = Trix
