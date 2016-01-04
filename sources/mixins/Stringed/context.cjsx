mixin = Mixin.createArged

  args:

    getStrings: React.PropTypes.func # ( constructor, keys )->= OR ( id, constructor, keys, that )->=
    definingType: React.PropTypes.oneOf [ 'standart', 'custom' ]
    contextHandling: React.PropTypes.oneOf [ 'ignore', 'overlap' ]

  ##

  defaults:

    definingType: 'standart'
    contextHandling: 'ignore'

  ##

  mixin: ( ARGS )->=

    getStrings = switch ARGS.definingType

      when 'standart' then _.memoize ( id, constructor, keys, that )->= ARGS.getStrings constructor, keys

      when 'custom' then ARGS.getStrings

    ##


    contextTypes = switch ARGS.contextHandling

      when 'ignore' then undefined

      else { getStrings: React.PropTypes.func }

    ##


    getChildContext = switch ARGS.contextHandling

      when 'ignore' then _.once ->= getStrings: getStrings

      when 'overlap' then ->=

        getContextStrings = @context.getStrings

        getStrings: ( id, constructor, keys, that )->=

          contextStrings = _.funced getContextStrings, id, constructor, keys, that

          ourStrings = getStrings id, constructor, keys, that

          _.assign {}, contextStrings, ourStrings

        ##

      ##

    ##


    contextTypes: contextTypes

    childContextTypes:

      getStrings: React.PropTypes.func # ( id, constructor, keys, that )->=

    ##

    getChildContext: getChildContext

  ##

##


module.exports = mixin
