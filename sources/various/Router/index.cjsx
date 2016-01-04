URI = require 'urijs'

Routes = requireDependency 'js-routes'

getUrlData = requireSource 'various/getUrlData'


class Route

  constructor: ( pathScheme, options = {} )->

    @captures = []

    @constraints = options.constraints || {}

    @defaults = options.defaults || {}

    @pathChecker =

      pathScheme
      .replace /:/g, '§'
      .replace /\(([^)]*)\)/g, "(?:$1)?"
      .replace /\./g, '\\.'
      .replace /§(\w+)/g, ( match, name )=>=

        @captures.push name

        "(#{ @constraints[ name ] || '[\\w\\-]+' })"

      ##

    ##

    @pathChecker = RegExp '^' + @pathChecker + '$'

  ##

  check: ( path )->=

    match = path.match @pathChecker

    return unless match

    _.transform @captures, ( result, name, index )->

      result[ name ] = match[ index + 1 ] || @defaults[ name ]

    , {}, this

  ##

##


class Router

  constructor: ( handlers )->

    @routes = {}
    @handlers = {}

    _.each handlers, ( handler, name )->

      if _.isArray handler

        options = handler[ 1 ]
        handler = handler[ 0 ]

      else

        options = {}

      ##

      pathScheme =

        if Routes && /^[\w_]+$/.test( name ) && Routes[ name ]

          Routes[ name ].toString()

        else

          name

        ##

      ##

      @routes[ name ] = new Route pathScheme, options
      @handlers[ name ] = handler

    , this

  ##

  run: ( url )->=

    urlData = getUrlData url

    path = urlData.pathname

    search = URI.parseQuery urlData.search

    result = undefined

    _.each @routes, ( route, name )->=

      params = route.check path

      return unless params

      result =

        handler: @handlers[ name ]
        request:
          route: name
          path: path
          search: search
          params: _.merge {}, params, search

        ##

      ##

      return false

    , this

    result

  ##

##


module.exports = Router
