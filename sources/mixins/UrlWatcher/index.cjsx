# dependencies

Location = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location

# mixins

UnisonMixin = requireSource 'mixins/Unison'


UrlWatcherMixin = Mixin.create {

  name: 'UrlWatcherMixin'

  args: {

    'update': React.PropTypes.func # ( element )->

    'shouldWatch': React.PropTypes.funced React.PropTypes.bool # ( that )->= bool

  }

  defaults: {

    'update': _.method 'forceUpdate'

    'shouldWatch': true

  }

  mixins: [

    UnisonMixin

  ]

  mixin: ( ARGS )->=

    currHref = Location.href


    UnisonArgs = {

      name: 'UrlWatch'

      duration: 50

      update: ARGS.update

      shouldUnison: ARGS.shouldWatch

      shouldSkip: ->=

        nextHref = Location.href

        return true if nextHref == currHref

        currHref = nextHref

        return false

      ##

    }


    mixins: [

      UnisonMixin UnisonArgs

    ]

  ##

}


module.exports = UrlWatcherMixin
