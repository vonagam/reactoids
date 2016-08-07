# mixins

InputMixin = requireSource 'mixins/Input'


mixin = Mixin.createArged {

  args: {

    isOptionSelected: React.PropTypes.func # ( option, selectedValue )->=

    checkOptionsConflict: React.PropTypes.func # ( that, props, state )->

  }

  mixins: [ InputMixin ]

  mixin: ( ARGS )->=

    mapArrayOption = ( variant )->=

      return mapArrayOption variant() if _.isFunction variant

      return { value: variant, label: variant } unless _.isObject variant

      return { value: variant[ 0 ], label: variant[ 1 ] } if _.isArray variant

      return { value: variant.value, label: variant.label }

    ##

    mapObjectOption = ( value, key )->=

      return { value: key, label: value }

    ##


    mixins: [ InputMixin ]

    propTypes: {

      'options': React.PropTypes.collection.isRequired

      'mapOption': React.PropTypes.func

      'allowBlank': React.PropTypes.bool

    }

    getDefaultProps: ->=

      'allowBlank': true

    ##

    getOptions: ( props = @props, state = @state )->=

      selectedValue = @getValue props, state

      mapOption = props.mapOption || ( if _.isArray props.options then mapArrayOption else mapObjectOption )

      _.map props.options, ( value, key )->=

        option = mapOption value, key

        option.selected = ARGS.isOptionSelected option, selectedValue

        option

      ##

    ##

    componentWillMount: ->

      ARGS.checkOptionsConflict this, @props, @state

    ##

    componentWillReceiveProps: ( nextProps )->

      ARGS.checkOptionsConflict this, nextProps, @state

    ##

    componentDidUpdate: ->

      ARGS.checkOptionsConflict this, @props, @state

    ##

  ##

}


module.exports = mixin
