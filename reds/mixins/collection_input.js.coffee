$require 'mixins/input'


getOption = ( variant )->

  return variant() if _.isFunction variant
  return [ variant, variant ] unless _.isObject variant
  return [ variant[ 0 ], variant[ 1 ] ] if _.isArray option
  return [ variant.value, variant.label ]


mixin =

  propTypes:

    collection: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.array ] ).isRequired
    allow_blank: React.PropTypes.bool

  getDefaultProps: ->

    allow_blank: true

  getOptions: ( func, thisArg )->

    mapper = if _.isArray @props.collection then getOption else ( label, value )-> [ value, label ]

    options = _.map @props.collection, mapper

    _.map options, ( option )-> _.pass func, option, thisArg


ReactMixinManager.add 'collection_input', mixin, 'input'
