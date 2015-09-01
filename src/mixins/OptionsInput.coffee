InputMixin = require '../mixins/Input'


mapArrayOption = ( variant )->

  return getOption variant() if _.isFunction variant

  return { value: variant, label: variant } unless _.isObject variant
  
  return { value: variant[ 0 ], label: variant[ 1 ] } if _.isArray variant
  
  return { value: variant.value, label: variant.label }

mapObjectOption = ( value, key )->

  return { value: key, label: value }

checkOptionsConflict = ( that, props, state )->

  value = that.getValue props, state

  options = that.getOptions props, state

  if value == undefined || _.none options, 'selected'

    unless props.allowBlank || _.isEmpty options

      that.setValue options[ 0 ].value

    else if value

      that.setValue undefined
  
  return
  

mixin =

  mixins: [ InputMixin ]

  propTypes:

    options: React.PropTypes.collection.isRequired
    mapOption: React.PropTypes.func
    allowBlank: React.PropTypes.bool

  getDefaultProps: ->

    allowBlank: true

  getOptions: ( props = @props, state = @state )->

    selectedValue = @getValue props, state

    mapOption =

      if props.mapOption

        props.mapOption

      else if _.isArray props.options

        mapArrayOption

      else if

        mapObjectOption

    _.map props.options, ( value, key )->

      option = mapOption value, key, selectedValue

      option.selected = _.isEqual option.value, selectedValue

      option

  componentWillMount: ->

    checkOptionsConflict this, @props, @state

    return

  componentWillReceiveProps: ( nextProps )->

    checkOptionsConflict this, nextProps, @state

    return

  componentDidUpdate: ->

    checkOptionsConflict this, @props, @state

    return


module.exports = mixin
