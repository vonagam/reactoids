# dependencies

windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location

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

    currHref = windowLocation.href


    UnisonArgs =

      name: 'UrlWatch'

      duration: 50

      update: ARGS.update

      shouldUnison: ARGS.shouldWatch

      shouldSkip: ->=

        nextHref = windowLocation.href

        return true if nextHref == currHref

        currHref = nextHref

        return false

      ##

    ##


    mixins: [ UnisonMixin UnisonArgs ]

  ##

##


module.exports = mixin
