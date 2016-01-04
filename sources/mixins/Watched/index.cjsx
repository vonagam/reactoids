UnisonMixin = requireSource 'mixins/Unison'


mixin = Mixin.createArged

  args:

    'name': React.PropTypes.string

    'getValue': React.PropTypes.func # ( element )->=

    'onChange': React.PropTypes.func # ( element, currValue, prevValue )->

  ##

  defaults:

    'name': ''

  ##

  mixins: [ UnisonMixin ]

  mixin: ( ARGS )->=

    member = "_watched#{ _.capitalize ARGS.name }"


    UnisonArgs = _.assign UnisonMixin.pick( ARGS ),

      name: "#{ ARGS.name }Watching"

      shouldUnison: true

      shouldSkip: false

      update: ( element )->

        currValue = ARGS.getValue element

        prevValue = element[ member ]

        return if _.isEqual currValue, prevValue

        ARGS.onChange element, currValue, prevValue

        element[ member ] = currValue

      ##

    ##


    mixins: [ UnisonMixin( UnisonArgs ) ]

    getInitialMembers: ->=

      "#{ member }": ARGS.getValue this

    ##

  ##

##


module.exports = mixin
