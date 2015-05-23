Button = $require 'elements/button'
$require 'mixins/input'
$require 'mixins/component'

$define ->


  File = React.createClass

    propTypes:

      file: React.PropTypes.any
      preview: React.PropTypes.bool
      remove: React.PropTypes.func

    onDataUrlLoad: ( reader )->

      return unless @isMounted()

      React.findDOMNode( @refs.preview ).src = reader.result

      return

    createDataUrl: ->

      reader = new FileReader

      reader.onload = _.partial @onDataUrlLoad, reader

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

        React.findDOMNode( @refs.preview ).src = '' 

      return

    render: ->

      file = @props.file

      if @props.preview

        preview = `<img ref='preview' className='preview' />`

      `<div className='file'>
        <div className='name'>{ file.name }</div>
        { preview }
        <Button className='remove' onClick={ this.props.remove } text='x' />
      </div>`


  Filer = React.createClass

    propTypes:

      multiple: React.PropTypes.bool
      preview: React.PropTypes.bool

    mixins: [ 'component', 'input' ]

    classes:
      'filler':
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
            '-set': ''
            '-add': ''
            '-clear': ''

    getDefaultProps: ->

      multiple: false
      preview: true

    getInitialState: ->

      dragging: false

    clear: ->

      @setValue undefined

      return

    onChange: ( event )->

      if event.dataTransfer

        files = _.toArray event.dataTransfer.files

      else

        files = _.toArray event.target.files

      if @action == 'set'

        value = if @props.multiple then files else files[ 0 ]

      else if @action == 'add'

        value = @getValue()

        value = if value then value.concat files else files

      @setValue value

      return

    onActionClick: ( action )->

      @action = action

      React.findDOMNode( @refs.input ).click()

      return

    onLabelClick: ->

      @onActionClick if @props.multiple then 'add' else 'set'

      return

    componentWillReceiveProps: ( next_props )->

      if @props.value != undefined && next_props.value == undefined

        React.findDOMNode( @refs.input ).value = ''

      return

    removeFile: ( file )->

      value = @props.value

      return unless value

      if @props.multiple

        value = _.without value, file

        value = undefined if value.length == 0

      else

        value = undefined if value == file

      @setValue value

      return

    onDragLeave: ->

      @setState dragging: false

      return

    onDragOver: ( event )->

      event.preventDefault()

      @setState dragging: true

      event.dataTransfer.dropEffect = 'copy'

      return

    onDrop: ( event )->

      event.preventDefault()

      @setState dragging: false

      @onChange event

      return

    render: ->

      value = @getValue()

      className = @classes 'Filer',
        if value then '-filled' else '-empty',
        '-multiple': @props.multiple
        '-dragging': @props.dragging

      if value

        value = [ value ] unless _.isArray value

        files = _.map value, ( file, index )->

          `<File
            key={ index }
            file={ file }
            preview={ this.props.preview }
            remove={ _.partial( this.removeFile, file ) }
          />`

        , this

      if @props.multiple

        add_action =

          `<Button
            className='action -add'
            onClick={ value && _.partial( this.onActionClick, 'add' ) }
            text='Add'
          />`

      `<div
        { ...this.omitProps() }
        className={ className }
      >
        <div className='files'>
          { files }
        </div>
        <div
          className='dropzone'
          onClick={ this.onLabelClick }
          onDragLeave={ this.onDragLeave }
          onDragOver={ this.onDragOver }
          onDrop={ this.onDrop }
        />
        <div className='actions'>
          <Button
            className='action -set'
            onClick={ _.partial( this.onActionClick, 'set' ) }
            text='Upload'
          />
          { add_action }
          <Button
            className='action -clear'
            onClick={ value && this.clear }
            text='Clear'
          />
        </div>
        <input
          ref='input'
          style={ { display: 'none' } }
          type='file'
          multiple={ this.props.multiple }
          onChange={ this.onChange }
        />
      </div>`
