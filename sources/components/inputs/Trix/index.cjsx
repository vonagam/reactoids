# dependencies

TrixEditor = requireDependency( 'trix' ) && requireWindow( 'window' ).Trix # basecamp/trix, https://trix-editor.org

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


EVENTS = [

  'initialize'
  'selection-change'
  #'focus'
  #'blur'
  'file-accept'
  'attachment-add'
  'attachment-remove'

]


Trix = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-readonly': ''
        '-focus': ''
        'editor': ''
        'toolbar': ''

      }

    }

    InputMixin()

    FocusMixin findFocusables: ( that )->= that.dom 'editor'

    EventListenerMixin()

  ]

  propTypes: {

    'inputProps': React.PropTypes.object

    'toolbarProps': React.PropTypes.object

    'editorProps': React.PropTypes.object

    'onInitialize': React.PropTypes.func

    'onSelectionChange': React.PropTypes.func

    'onFocus': React.PropTypes.func

    'onBlur': React.PropTypes.func

    'onFileAccept': React.PropTypes.func

    'onAttachmentAdd': React.PropTypes.func

    'onAttachmentRemove': React.PropTypes.func

    'placeholder': React.PropTypes.string

  }

  getDefaultProps: ->=

    'defaultValue': ''

  ##

  getInitialState: ->=

    'focus': 0

  ##

  componentWillMount: ->

    @trixId = _.uniqueId 'trixId'

  ##

  componentDidMount: ->

    editor = @dom 'editor'

    toolbar = @dom 'toolbar'


    @addEventListener target: toolbar, event: 'mousedown', callback: ( event )-> event.target.tagName == 'DIV' && event.preventDefault()


    addEditorListener = _.bind ( event, callback )->

      @addEventListener target: editor, event: event, callback: callback

    , this


    addEditorListener 'trix-initialize', _.bind ->

      @trix = editor.editor

      @syncTrixValue()

      @onFocusChange( +1 ) if editor == document.activeElement


      addEditorListener 'trix-change', @onChange

      addEditorListener 'trix-blur', @onBlur

      addEditorListener 'trix-file-accept', _.bind ( ( event )-> ! @props.onAttachmentAdd && event.preventDefault() ), this

      addEditorListener 'keydown', _.bind ( ( event )-> @props.readOnly && event.preventDefault() ), this

      addEditorListener 'trix-focus', _.partial @onFocusChange, +1

      addEditorListener 'trix-blur', _.partial @onFocusChange, -1

      addEditorListener 'trix-toolbar-dialog-show', _.partial @onFocusChange, +1

      addEditorListener 'trix-toolbar-dialog-hide', _.partial @onFocusChange, -1


      _.each EVENTS, _.bind ( event )->

        addEditorListener "trix-#{ event }", @callback "props.#{ _.camelCase "on-#{ event }" }"

      , this


      @props.onInitialize?()

    , this

  ##

  componentDidUpdate: ( prevProps, prevState )->

    return if _.isEqual @getValue(), @getValue( prevProps, prevState )

    @syncTrixValue()

  ##

  syncTrixValue: ->

    trix = @trix

    return unless trix

    trixValue = @refs.input.value

    currValue = @getValue()

    return if trixValue == currValue

    trix.loadHTML currValue

  ##

  onChange: ( event )->

    @setTempValue event.target.value

    @syncTrixValue() if @props.readOnly

  ##

  onBlur: ( event )->

    @setValue event.target.value

  ##

  onFocusChange: ( delta )->

    @updateStateKey 'focus', _.bind ( prevFocus )->=

      nextFocus = _.clamp prevFocus + delta, 0, 2

      _.funced @props.onFocus if nextFocus == 1 && prevFocus == 0

      _.funced @props.onBlur if nextFocus == 0 && prevFocus == 1

      nextFocus

    , this

  ##

  render: ->=

    { props, state, classed } = this

    { inputProps, toolbarProps, editorProps, placeholder } = props


    <div {... @omitProps() } className={ classed '.', '-focus': state.focus > 0, '-readonly': props.readOnly }>

      <input

        {... inputProps }

        ref='input'

        id={ "#{ @trixId }_input" }

        type='hidden'

      />

      <trix-toolbar

        {... toolbarProps }

        ref='toolbar'

        id={ "#{ @trixId }_toolbar" }

        class={ classed 'toolbar' }

      />

      <trix-editor

        {... editorProps }

        ref='editor'

        class={ classed 'editor' }

        input={ "#{ @trixId }_input" }

        toolbar={ "#{ @trixId }_toolbar" }

        placeholder={ placeholder }

      />

    </div>

  ##

}


module.exports = Trix
