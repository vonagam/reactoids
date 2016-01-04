mixin = Mixin.createArged

  args:

    'strings': React.PropTypes.arrayOf React.PropTypes.string

  ##

  mixin: ( ARGS )->=

    ID = _.uniqueId()


    inputToStrings = ( input )->=

      return undefined if ! _.isObject input

      return _.transform input, ( ( result, input )-> _.merge result, input ), {} if _.isArray input

      return input

    ##


    setPropsStrings = ( that, props )->=

      stringsPropsInput = _.funced props.strings, that

      return false if _.isEqual that._stringed.stringsPropsInput, stringsPropsInput

      that._stringed.stringsPropsInput = stringsPropsInput

      stringsProps = inputToStrings stringsPropsInput

      return false if _.isEqual that._stringed.stringsProps, stringsProps

      that._stringed.stringsProps = stringsProps

      return true

    ##

    setContextStrings = ( that, context )->=

      stringsContextInput = _.funced context.getStrings, ID, that.constructor, ARGS.strings, that

      return false if _.isEqual that._stringed.stringsContextInput, stringsContextInput

      that._stringed.stringsContextInput = stringsContextInput

      stringsContext = inputToStrings stringsContextInput

      return false if _.isEqual that._stringed.stringsContext, stringsContext

      that._stringed.stringsContext = stringsContext

      return true

    ##

    setStrings = ( that, props, context )->

      changedProps = setPropsStrings that, props

      changedContext = setContextStrings that, context

      return unless changedProps || changedContext

      that._stringed.strings = _.merge {}, that._stringed.stringsContext, that._stringed.stringsProps

    ##


    propTypes:

      strings: React.PropTypes.funced React.PropTypes.object, React.PropTypes.array # ( that )->=

    ##

    contextTypes:

      getStrings: React.PropTypes.func # ( id, constructor, keys, that )->=

    ##

    getInitialMembers: ->=

      _stringed:
        strings: {}
        stringsProps: {}
        stringsPropsInput: undefined
        stringsContext: {}
        stringsContextInput: undefined

      ##

    ##

    componentWillMount: ->

      setStrings this, @props, @context

    ##

    componentWillUpdate: ( nextProps, nextState, nextContext )->

      setStrings this, nextProps, nextContext

    ##

    stringed: ( key, params )->=

      strings = @_stringed.strings

      _.funced strings[ key ], params, this

    ##

  ##

##


module.exports = mixin
