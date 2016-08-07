# dependencies

Basil = requireDependency 'basil.js' # wisembly/basil.js, http://wisembly.github.io/basil.js

# mixins

ExternalStoreMixin = requireSource 'mixins/ExternalStore'


mixin = Mixin.createArged

  args:

    'options': React.PropTypes.object

    'key': React.PropTypes.string

  ##

  defaults:

    # ExtenralStore

    'name': 'basil'

  ##

  mixin: ( ARGS )->=

    basil = new Basil ARGS.options


    ExternalStoreArgs = _.assign {}, ARGS,

      get: ( that )->= basil.get ARGS.key

      set: ( that, value )-> basil.set ARGS.key, value

    ##


    mixins: [ ExternalStoreMixin( ExternalStoreArgs ) ]

  ##

##


module.exports = mixin
