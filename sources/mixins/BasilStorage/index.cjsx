# dependencies

Basil = requireDependency 'basil.js' # wisembly/basil.js, http://wisembly.github.io/basil.js

# mixins

BaseStorageMixin = requireSource 'mixins/BaseStorage'


BasilStorageMixin = Mixin.create {

  name: 'BasilStorageMixin'

  args: {

    'options': React.PropTypes.object

    'key': React.PropTypes.string

  }

  defaults: {

    # ExternalStoreMixin

    'name': 'basil'

  }

  mixins: [

    BaseStorageMixin

  ]

  mixin: ( ARGS )->=

    basil = new Basil ARGS.options


    BaseStorageArgs = {

      name: ARGS.name

      get: ( that )->= basil.get ARGS.key

      set: ( that, value, callback )->

        basil.set ARGS.key, value

        callback.call that

      ##

    }


    mixins: [

      BaseStorageMixin BaseStorageArgs

    ]

  ##

}


module.exports = BasilStorageMixin
