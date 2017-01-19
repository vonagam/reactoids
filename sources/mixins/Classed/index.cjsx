# various

argsToString = requireSource 'various/classes'


ClassedMixin = Mixin.create {

  name: 'ClassedMixin'

  args: {

    'classes': React.PropTypes.object

  }

  defaults: {

    'classes': {}

  }

  mixin: ( ARGS )->=

    ID = _.uniqueId()

    KEYS = []

    KEYS_LOOKUP = {}


    fillKeys = ( value, keys )->

      key = keys.join( '.' ) || '.'

      KEYS.push key

      KEYS_LOOKUP[ key ] = key

      _.times keys.length - 1, ( i )->

        KEYS_LOOKUP[ keys.slice( i + 1 ).join( '.' ) ] = key

      ##

      if _.isObject value

        _.each value, ( val, key )->

          fillKeys val, keys.concat key

        ##

      ##

    ##

    fillKeys ARGS.classes, []


    mergeClassNames = ->=

      classNames = _.compact _.flattenDeep arguments

      return classNames[ 0 ] if classNames.length < 2

      return classNames.join ' ' if _.every classNames, _.isString

      return classNames

    ##

    mapClassesKeys = ( classes )->=

      _.mapKeys classes, ( value, key )->= KEYS_LOOKUP[ key ] || key

    ##

    mergeClasseses = ->=

      classeses = _.flattenDeep arguments

      args = [ {} ].concat classeses, ( a, b )->= mergeClassNames a, b

      _.mergeWith.apply _, args

    ##

    classNameToClasses = ( className )->=

      return undefined if ! className

      return { '.': className } if ! _.isObject className

      return mergeClasseses _.map className, classNameToClasses if _.isArray className

      return mapClassesKeys className

    ##


    setPropsClasses = ( that, props )->=

      classesPropsInput = _.funced props.className, that

      return false if _.isEqual that._classed.classesPropsInput, classesPropsInput

      that._classed.classesPropsInput = classesPropsInput

      classesProps = classNameToClasses classesPropsInput

      return false if _.isEqual that._classed.classesProps, classesProps

      that._classed.classesProps = classesProps

      return true

    ##

    setContextClasses = ( that, context )->=

      classesContextInput = _.funced context.getClassNames, that.constructor, KEYS, ID

      return false if _.isEqual that._classed.classesContextInput, classesContextInput

      that._classed.classesContextInput = classesContextInput

      classesContext = classNameToClasses classesContextInput

      return false if _.isEqual that._classed.classesContext, classesContext

      that._classed.classesContext = classesContext

      return true

    ##

    setClasses = ( that, props, context )->

      changedProps = setPropsClasses that, props

      changedContext = setContextClasses that, context

      return unless changedProps || changedContext

      that._classed.classes = mergeClasseses that._classed.classesContext, that._classed.classesProps

      that._classed.cache = {}

    ##


    propTypes: {

      'className': React.PropTypes.funced React.PropTypes.string, React.PropTypes.array, React.PropTypes.object # ( that )->=

    }

    contextTypes: {

      'getClassNames': React.PropTypes.func # ( constructor, keys, id )->=

    }

    getInitialMembers: ->=

      '_classed': {

        cache: {}
        classes: {}
        classesProps: {}
        classesPropsInput: undefined
        classesContext: {}
        classesContextInput: undefined

      }

    ##

    componentWillMount: ->

      setClasses this, @props, @context

    ##

    componentWillUpdate: ( nextProps, nextState, nextContext )->

      setClasses this, nextProps, nextContext

    ##

    mergeClassNames: ->=

      mergeClassNames arguments

    ##

    classed: ->=

      keys = argsToString arguments

      cache = @_classed.cache

      return cache[ keys ] if _.has cache, keys

      classes = @_classed.classes

      result = mergeClassNames _.map keys.split( ' ' ), ( key )->= classes[ KEYS_LOOKUP[ key ] || key ]

      cache[ keys ] = result

      result

    ##

  ##

}


module.exports = ClassedMixin
