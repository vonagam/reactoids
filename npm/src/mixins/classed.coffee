CONFIG =

  classes: {}

  func: ( scheme )->

    _.transform scheme, ( result, path )->

      result[ path ] = path.replace /^.+\.([^\.]+)$/, '$1'

      return

    , {}


§export CONFIG


mixin = ->
  
  NAME = undefined

  SCHEME = undefined

  CLASSES = undefined


  #object -> array of classes names
  makeScheme = ( scheme_plan )->

    result = []

    flatten = ( nesting_key, value, key )->

      current_key = nesting_key + key

      result.push current_key

      return unless _.isPlainObject value

      _.each value, _.partial( flatten, current_key + '.' )

      return

    _.each scheme_plan, _.partial( flatten, '' )

    result

  #key -> key in scheme
  getSchemeKey = (->

    cache = {}

    ( key )->

      return NAME if key == ''

      return cache[ key ] if _.has cache, key

      check = new RegExp '(?:^|\\.)' + key.replace( '.', '\\.' ) + '$'

      result = _.find SCHEME, ( scheme_key )-> check.test scheme_key

      result ||= key

      cache[ key ] = result

      result

  )()

  #object -> object with mapped keys
  mapToSchemeKeys = ( object )->

    _.mapKeys object, ( value, key )-> getSchemeKey key

  #array of classNames -> className
  mergeClassNames = ( class_names )->

    class_names = _.compact _.flattenDeep class_names

    return class_names[ 0 ] if class_names.length < 2

    return class_names.join ' ' unless _.any class_names, _.isPlainObject

    return class_names

  #array of classeses -> classes
  mergeClasseses = ( classes )->

    args = [ {} ].concat classes, ( a, b )-> mergeClassNames [ a, b ]

    _.merge.apply _, args

  #className -> classes object
  toClasses = ( class_name )->

    return {} unless class_name

    return mapToSchemeKeys class_name if _.isPlainObject class_name

    return mergeClasseses _.flattenDeep _.map class_name, toClasses if _.isArray class_name

    return "#{ NAME }": class_name

  #init mixin class variables
  initMixin = ( scheme_plan )->

    return if NAME

    NAME = _.keys( scheme_plan )[ 0 ]

    SCHEME = makeScheme scheme_plan

    CLASSES = toClasses CONFIG.classes[ NAME ] || CONFIG.func SCHEME

    return

  #after change of className prop
  setClasses = ( that, class_name )->

    if class_name

      classes = toClasses class_name

      classes = mergeClasseses [ CLASSES, classes ]

    else

      classes = CLASSES

    that.__classed_classes = classes

    that.__classed_cache = {}

    return


  propTypes:

    className: React.PropTypes.oneOfType [ React.PropTypes.string, React.PropTypes.array, React.PropTypes.object ]

  componentWillMount: ->

    initMixin this.classes

    setClasses this, this.props.className

    return

  componentWillUpdate: ( next_props )->

    return if _.isEqual @props.className, next_props.className

    setClasses this, next_props.className

    return

  mergeClassNames: ( class_names... )->

    mergeClassNames class_names

  classed: ( keys... )->

    keys = _.flatten _.map keys, ( key )->

      return _.truthyKeys key if _.isPlainObject key

      return key

    cache = this.__classed_cache

    cache_key = keys.join '&'

    return cache[ cache_key ] if _.has cache, cache_key

    classes = this.__classed_classes

    scheme_keys = _.map keys, ( key )-> getSchemeKey key

    class_names = _.map scheme_keys, ( scheme_key )-> classes[ scheme_key ]

    class_name = mergeClassNames class_names

    cache[ cache_key ] = class_name

    class_name


ReactMixinManager.add 'classed', mixin
