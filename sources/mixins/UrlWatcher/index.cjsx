# dependencies

window = requireDependency 'window' # location

# mixins

UnisonMixin = requireSource 'mixins/Unison'


mixin = Mixin.createArged

  args:

    'update': React.PropTypes.func # ( element )->

    'shouldWatch': React.PropTypes.funced React.PropTypes.bool # ( that )->=

  ##

  defaults:

    'update': _.method 'forceUpdate'

    'shouldWatch': true

  ##

  mixins: [ UnisonMixin ]

  mixin: ( ARGS )->=

    currHref = window.location.href


    UnisonArgs =

      name: 'UrlWatch'

      duration: 50

      update: ARGS.update

      shouldUnison: ARGS.shouldWatch

      shouldSkip: ->=

        nextHref = window.location.href

        return true if nextHref == currHref

        currHref = nextHref

        return false

      ##

    ##


    mixins: [ UnisonMixin UnisonArgs ]

  ##

##


module.exports = mixin
