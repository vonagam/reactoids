ClassedContextMixin = Mixin.create {

  name: 'ClassedContextMixin'

  args: {

    'getClassNames': React.PropTypes.func # ( that, constructor, keys )->=

    'contextHandling': React.PropTypes.oneOf [ 'ignore', 'combine', 'overlap' ]

  }

  defaults: {

    'contextHandling': 'ignore'

  }

  mixin: ( ARGS )->=

    getClassNames = _.memoize(

      ( that, constructor, keys, id )->= ARGS.getClassNames that, constructor, keys

      ( that, constructor, keys, id )->= id

    )


    contextTypes = switch ARGS.contextHandling

      when 'ignore' then undefined

      else { 'getClassNames': React.PropTypes.func }

    ##


    getChildContext = switch ARGS.contextHandling

      when 'ignore' then _.once ->=

        getClassNames: _.partial getClassNames, this

      else ->=

        getContextClassNames = @context.getClassNames

        getClassNames: ( constructor, keys, id )->=

          contextClassNames = _.funced getContextClassNames, constructor, keys, id

          ourClassNames = getClassNames this, constructor, keys, id

          switch ARGS.contextHandling

            when 'combine' then return [ contextClassNames, ourClassNames ]

            when 'overlap' then return _.assign {}, contextClassNames, ourClassNames

          ##

        ##

      ##

    ##


    contextTypes: contextTypes

    childContextTypes: {

      'getClassNames': React.PropTypes.func # ( id, constructor, keys, that )->=

    }

    getChildContext: getChildContext

  ##

}


module.exports = ClassedContextMixin
