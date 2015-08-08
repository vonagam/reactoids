§require 'mixins/input'


getOption = ( variant )->

  return variant() if _.isFunction variant
  return [ variant, variant ] unless _.isObject variant
  return [ variant[ 0 ], variant[ 1 ] ] if _.isArray variant
  return [ variant.value, variant.label ]


mixin =

  propTypes:

    collection: React.PropTypes.collection.isRequired

  mapOptions: ( iteratee )->

    mapper = if _.isArray @props.collection then getOption else ( label, value )-> [ value, label ]

    options = _.map @props.collection, mapper

    _.map options, ( ( option )-> iteratee.apply this, option ), this


ReactMixinManager.add 'collection_input', mixin, 'input'
