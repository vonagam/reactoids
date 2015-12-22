Mixin = requireSource 'various/Mixin'

InputMixin = requireSource 'mixins/Input'


# TODO: What to do with value duplicates?


mapArrayOption = ( variant )->=

  return mapArrayOption variant() if _.isFunction variant

  return { value: variant, label: variant } unless _.isObject variant
  
  return { value: variant[ 0 ], label: variant[ 1 ] } if _.isArray variant
  
  return { value: variant.value, label: variant.label }

mapObjectOption = ( value, key )->=

  return { value: key, label: value }

checkOptionsConflict = ( that, props, state )->

  value = that.getValue props, state

  options = that.getOptions props, state

  if value == undefined || _.none options, 'selected'

    unless props.allowBlank || _.isEmpty options

      that.setValue options[ 0 ].value

      return

  if value != undefined && _.none options, 'selected'

    that.setValue undefined


mixin =

  Mixin.createPlain

    mixins: [ InputMixin ]

    propTypes:

      options: React.PropTypes.collection.isRequired
      mapOption: React.PropTypes.func
      allowBlank: React.PropTypes.bool

    getDefaultProps: ->=

      allowBlank: true

    getOptions: ( props = @props, state = @state )->=

      selectedValue = @getValue props, state

      mapOption = props.mapOption || ( if _.isArray props.options then mapArrayOption else mapObjectOption )

      _.map props.options, ( value, key )->=

        option = mapOption value, key

        option.selected = true if _.isEqual option.value, selectedValue

        option

    componentWillMount: ->

      checkOptionsConflict this, @props, @state

    componentWillReceiveProps: ( nextProps )->

      checkOptionsConflict this, nextProps, @state

    componentDidUpdate: ->

      checkOptionsConflict this, @props, @state


module.exports = mixin
