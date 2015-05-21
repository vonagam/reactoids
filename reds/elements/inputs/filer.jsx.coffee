Button = $require 'elements/button'
$require 'mixins/input'
$require 'mixins/component'

$define ->


  File = React.createClass

    onDataUrlLoad: ( reader )->

      return unless @isMounted()

      #React.findDOMNode( @refs.preview ).style.backgroundImage = "url(#{ reader.result })"
      React.findDOMNode( @refs.preview ).src = reader.result

      return

    createDataUrl: ->

      reader = new FileReader

      reader.onload = _.partial @onDataUrlLoad, reader

      reader.readAsDataURL @props.file

      return

    componentDidMount: ->

      @createDataUrl()

      return

    componentDidUpdate: ( prev_props )->

      return if prev_props.file == @props.file

      @createDataUrl()

      return

    componentWillReceiveProps: ( next_props )->

      return if next_props.file == @props.file

      #React.findDOMNode( @refs.preview ).style.backgroundImage = ''
      React.findDOMNode( @refs.preview ).src = ''

      return

    render: ->

      file = @props.file

      `<div className='file'>
        <Button className='remove' onClick={ this.props.remove } text='x' />
        <img ref='preview' className='preview' />
        <div className='name'>{ file.name }</div>
      </div>`


  Filer = React.createClass

    propTypes:

      multiple: React.PropTypes.bool

    mixins: [ 'component', 'input' ]

    clear: ->

      @setValue undefined

      return

    onChange: ( event )->

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

      @onActionClick 'set'

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

    render: ->

      value = @getValue()

      className = @classes 'Filer',
        if value then '-filled' else '-empty',
        '-multiple': @props.multiple

      if value

        value = [ value ] unless _.isArray value

        files = _.map value, ( file, index )->

          `<File
            key={ index }
            file={ file }
            remove={ _.partial( this.removeFile, file ) }
          />`

        , this

      if @props.multiple

        add_action =

          `<Button
            className='action -add'
            onClick={ value && _.partial( this.onActionClick, 'add' ) }
            text='Добавить'
          />`

      `<div
        { ...this.omitProps() }
        className={ className }
      >
        <div className='files'>
          { files }
        </div>
        <div className='actions'>
          <Button
            className='action -set'
            onClick={ _.partial( this.onActionClick, 'set' ) }
            text='Загрузить'
          />
          { add_action }
          <Button
            className='action -clear'
            onClick={ value && this.clear }
            text='Очистить'
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
