# mixins

UnisonMixin = requireSource 'mixins/Unison'


mixin = Mixin.createArged

  args:

    'name': React.PropTypes.string

    'getValue': React.PropTypes.func # ( that )->=

    'onChange': React.PropTypes.func # ( that, currValue, prevValue )->

    'callOnMount': React.PropTypes.bool

  ##

  defaults:

    'name': ''

    'callOnMount': false

  ##

  mixins: [ UnisonMixin ]

  mixin: ( ARGS )->=

    member = "_watched#{ _.pascalCase ARGS.name }"


    UnisonArgs = _.assign UnisonMixin.pick( ARGS ),

      name: "#{ ARGS.name }Watching"

      shouldUnison: true

      shouldSkip: false

      update: ( that )->

        currValue = ARGS.getValue that

        prevValue = that[ member ]

        return if _.isEqual currValue, prevValue

        ARGS.onChange that, currValue, prevValue

        that[ member ] = currValue

      ##

    ##


    mixins: [ UnisonMixin( UnisonArgs ) ]

    getInitialMembers: ->=

      "#{ member }": ARGS.getValue this

    ##

    componentDidMount: ->

      return unless ARGS.callOnMount

      ARGS.onChange this, @[ member ], undefined

    ##

  ##

##


module.exports = mixin
