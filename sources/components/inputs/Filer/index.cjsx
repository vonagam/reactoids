# dependencies

FileReader = requireWindow 'FileReader' # https://developer.mozilla.org/en-US/docs/Web/API/FileReader

# mixins

StringedMixin = requireSource 'mixins/Stringed'

DomMixin = requireSource 'mixins/Dom'

PureRenderMixin = requireSource 'mixins/PureRender'

# components

Button = requireSource 'components/general/Button'


File = React.createClass {

  mixins: [

    PureRenderMixin()

    DomMixin()

  ]

  propTypes: {

    'file': React.PropTypes.any

    'preview': React.PropTypes.bool

    'classed': React.PropTypes.func

    'stringed': React.PropTypes.func

    'onRemove': React.PropTypes.func

  }

  onDataUrlLoad: ( reader )->

    return unless @isMounted()

    @dom( 'preview' ).src = reader.result

  ##

  createDataUrl: ->=

    reader = new FileReader

    reader.onload = _.partial @onDataUrlLoad, reader

    reader.readAsDataURL @props.file

  ##

  componentDidMount: ->

    if @props.preview

      @createDataUrl()

    ##

  ##

  componentDidUpdate: ( prevProps )->

    if @props.preview && prevProps.file != @props.file

      @createDataUrl()

    ##

  ##

  componentWillReceiveProps: ( nextProps )->

    if @props.preview && nextProps.file != @props.file

      @dom( 'preview' ).src = ''

    ##

  ##

  render: ->=

    { props } = this

    { file, classed, stringed } = props


    <div className={ classed 'file' }>

      <div className={ classed 'name' } children={ file.name } />

      {

        <img ref='preview' className={ classed 'preview' } /> if props.preview

      }

      <Button className={ classed 'remove' } onClick={ props.onRemove } children={ stringed 'remove' } />

    </div>

  ##

}


Filer = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

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
        'dropzone':
          'drop': ''
        'actions':
          'action':
            '-select': ''
            '-clear': ''

      }

    }

    StringedMixin strings: [ 'select', 'clear', 'remove', 'drop' ]

    InputMixin()

    FocusMixin findFocusables: ( that )->= that.dom 'input'

  ]

  propTypes: {

    'multiple': React.PropTypes.bool

    'preview': React.PropTypes.bool

  }

  getDefaultProps: ->=

    'multiple': false

    'preview': true

  ##

  getInitialState: ->=

    'dragging': false

  ##

  componentWillReceiveProps: ( nextProps )->

    if @props.value != undefined && nextProps.value == undefined

      @dom( 'input' ).value = ''

    ##

  ##

  onChange: ( event )->

    files = _.toArray( _.get( event, 'dataTransfer.files' ) || _.get( event, 'target.files' ) )

    return if _.isEmpty files

    if @props.multiple

      currentValue = @getValue() || []

      value = currentValue.concat files

    else

      value = files[ 0 ]

    ##

    @setValue value

  ##

  onFileRemove: ( file )->

    currentValue = @getValue()

    return unless currentValue

    if @props.multiple

      value = _.without currentValue, file

      value = undefined if value.length == 0

    else

      value = undefined if file == currentValue

    ##

    @setValue value

  ##

  onSelectClick: ->

    @dom( 'input' ).click()

  ##

  onLabelClick: ->

    @onSelectClick()

  ##

  onClearClick: ->

    @setValue undefined

  ##

  onDragLeave: ->

    @setState dragging: false

  ##

  onDragOver: ( event )->

    @setState dragging: true

    event.dataTransfer.dropEffect = 'copy'

    event.preventDefault()

  ##

  onDrop: ( event )->

    @setState dragging: false

    @onChange event

    event.preventDefault()

  ##

  render: ->=

    { props, classed, stringed } = this

    value = @getValue()


    <div

      {... @omitProps() }

      className={

        classed( '.',

          "-#{ if value then 'filled' else 'empty' }"
          '-readonly': props.readOnly
          '-multiple': props.multiple
          '-dragging': props.dragging

        )

      }

    >

      <div className={ classed 'files' }>

        {

          if value

            _.map ( if props.multiple then value else [ value ] ), _.bind ( file, index )->=

              <File

                key={ index }

                file={ file }

                preview={ props.preview }

                classed={ classed }

                stringed={ stringed }

                onRemove={ @_partial @onFileRemove, file }

              />

            , this

          ##

        }

      </div>

      <div

        className={ classed 'dropzone' }

        onClick={ @onLabelClick }

        onDragLeave={ @onDragLeave }

        onDragOver={ @onDragOver }

        onDrop={ @onDrop }

        children={ <div className={ classed 'drop' } children={ stringed 'drop' } /> }

      />

      <div className={ classed 'actions' }>

        <Button

          className={ classed 'action', '-select' }

          onClick={ @onSelectClick }

          children={ stringed 'select', value: value, multiple: props.multiple }

        />

        <Button

          className={ classed 'action', '-clear' }

          onClick={ @onClearClick if value }

          children={ stringed 'crear' }

        />

      </div>

      <input

        ref='input'

        style={ display: 'none' }

        type='file'

        multiple={ props.multiple }

        onChange={ @onChange }

      />

    </div>

  ##

}


module.exports = Filer
