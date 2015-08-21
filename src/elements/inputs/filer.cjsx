§global 'FileReader', 'window'

§require 'mixins/component'
§require 'mixins/input'
§require 'mixins/pure_render'

Button = §require 'elements/button'


File = React.createClass

  displayName: 'File'

  mixins: [ 'pure_render' ]

  propTypes:

    file: React.PropTypes.any
    preview: React.PropTypes.bool
    classed: React.PropTypes.func
    onRemove: React.PropTypes.func

  onDataUrlLoad: ( reader )->

    return unless @isMounted()

    @dom( 'preview' ).src = reader.result

    return

  createDataUrl: ->

    reader = new FileReader

    reader.onload = @_partial @onDataUrlLoad, reader

    reader.readAsDataURL @props.file

    return

  componentDidMount: ->

    if @props.preview

      @createDataUrl()

    return

  componentDidUpdate: ( prev_props )->

    if prev_props.file != @props.file && @props.preview

      @createDataUrl()

    return

  componentWillReceiveProps: ( next_props )->

    if next_props.file != @props.file && @props.preview

      @dom( 'preview' ).src = '' 

    return

  render: ->

    file = @props.file

    classed = @props.classed

    <div className={ classed 'file' }>
      <div className={ classed 'name' }>{ file.name }</div>
      { 

        if @props.preview

          <img
            ref='preview'
            className={ classed 'preview' }
          />

      }
      <Button
        className={ classed 'remove' }
        onClick={ @props.onRemove }
        text='x'
      />
    </div>


Filer = React.createClass

  displayName: 'Filer'

  mixins: [ 'component', 'input' ]

  classes:

    'filer':
      '-readonly': ''
      '-multiple': ''
      '-empty': ''
      '-filled': ''
      '-dragging': ''
      'files':
        'file':
          'name': ''
          'preview': ''
          'remove': ''
      'dropzone': ''
      'actions':
        'action':
          '-select': ''
          '-clear': ''

  propTypes:

    multiple: React.PropTypes.bool
    preview: React.PropTypes.bool

  getDefaultProps: ->

    multiple: false
    preview: true

  getInitialState: ->

    dragging: false

  onChange: ( event )->

    files = _.toArray(

      if event.dataTransfer

        event.dataTransfer.files

      else

        event.target.files

    )

    return if _.isEmpty files

    if @props.multiple

      current_value = @getValue()

      value = current_value.concat files

    else

      value = files[ 0 ]

    @setValue value

    return

  onSelectClick: ->

    @dom( 'input' ).click()

    return

  onLabelClick: ->

    @onSelectClick()

    return

  onClearClick: ->

    @setValue undefined

    return

  componentWillReceiveProps: ( next_props )->

    if @props.value != undefined && next_props.value == undefined

      @dom( 'input' ).value = ''

    return

  onFileRemove: ( file )->

    current_value = @getValue()

    return unless current_value

    if @props.multiple

      value = _.without current_value, file

      value = undefined if value.length == 0

    else

      value = undefined if file == current_value

    @setValue value

    return

  onDragLeave: ->

    @setState dragging: false

    return

  onDragOver: ( event )->

    @setState dragging: true

    event.dataTransfer.dropEffect = 'copy'

    event.preventDefault()

    return

  onDrop: ( event )->

    @setState dragging: false

    @onChange event

    event.preventDefault()

    return

  render: ->

    value = @getValue()

    button_text =

      if value

        if @props.multiple

          'Add Files'

        else

          'Change File'

      else

        if @props.multiple

          'Select Files'

        else

          'Select File'

    <div
      {... @omitProps() }
      className={ 

        @classed( '', 

          "-#{ if value then 'filled' else 'empty' }"
          '-readonly': @props.readonly
          '-multiple': @props.multiple
          '-dragging': @props.dragging

        )

      }
    >
      <div className={ @classed 'files' }>
        {

          if value

            _.map _.wrapInArray( value ), ( file, index )->

              <File
                key={ index }
                file={ file }
                preview={ @props.preview }
                classed={ @classed }
                onRemove={ @_partial @onFileRemove, file }
              />

            , this

        }
      </div>
      <div
        className={ @classed 'dropzone' }
        onClick={ @onLabelClick }
        onDragLeave={ @onDragLeave }
        onDragOver={ @onDragOver }
        onDrop={ @onDrop }
      />
      <div className={ @classed 'actions' }>
        <Button
          className={ @classed 'action', '-select' }
          onClick={ @onSelectClick }
          text={ button_text }
        />
        <Button
          className={ @classed 'action', '-clear' }
          onClick={ @onClearClick if value }
          text='Clear'
        />
      </div>
      <input
        ref='input'
        style={ display: 'none' }
        type='file'
        multiple={ @props.multiple }
        onChange={ @onChange }
      />
    </div>


§export Filer
