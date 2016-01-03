mixin = Mixin.createArged

  args:

    getClassNames: React.PropTypes.func # ( constructor, keys )->= OR ( id, constructor, keys, that )->=
    definingType: React.PropTypes.oneOf [ 'standart', 'custom' ]
    contextHandling: React.PropTypes.oneOf [ 'ignore', 'combine', 'overlap' ]

  defaults:

    definingType: 'standart'
    contextHandling: 'ignore'

  mixin: ( ARGS )->=

    getClassNames = switch ARGS.definingType

      when 'standart' then _.memoize ( id, constructor, keys, that )->= ARGS.getClassNames constructor, keys

      when 'custom' then ARGS.getClassNames


    contextTypes = switch ARGS.contextHandling

      when 'ignore' then undefined

      else { getClassNames: React.PropTypes.func }


    getChildContext = switch ARGS.contextHandling

      when 'ignore' then _.once ->= getClassNames: getClassNames

      else ->=

        getContextClassNames = @context.getClassNames

        getClassNames: ( id, constructor, keys, that )->=

          contextClassNames = _.funced getContextClassNames, id, constructor, keys, that

          ourClassNames = getClassNames id, constructor, keys, that

          switch ARGS.contextHandling

            when 'combine' then return [ contextClassNames, ourClassNames ]

            when 'overlap' then return _.assign {}, contextClassNames, ourClassNames


    contextTypes: contextTypes

    childContextTypes:

      getClassNames: React.PropTypes.func # ( id, constructor, keys, that )->=

    getChildContext: getChildContext


module.exports = mixin
