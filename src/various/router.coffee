#§global 'Routes', 'https://github.com/railsware/js-routes'

SearchParams = require '../various/SearchParams'


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
      .replace /§(\w+)/g, ( match, name )=>

        @captures.push name

        @constraints[ name ] || '([\\w\\-]+)'

    @pathChecker = RegExp '^' + @pathChecker + '$'

  check: ( path )->=

    match = path.match @pathChecker

    return unless match

    _.transform @captures, ( result, name, index )->

      result[ name ] = match[ index + 1 ] || @defaults[ name ]

    , {}, this


class Router

  constructor: ( handlers = {} )->

    @routes = {}
    @handlers = {}

    @add handlers

  add: ( handlers )->

    _.each handlers, ( handler, name )->

      if _.isArray handler

        options = handler[ 1 ]
        handler = handler[ 0 ]

      else 

        options = {}

      pathScheme =

        if Routes && /^\w+$/.test name

          Routes[ name ].toString()

        else

          name

      @routes[ name ] = new Route pathScheme, options
      @handlers[ name ] = handler

    , this

  run: ( url )->=

    [ path, search ] = url.split '?'

    _.find @routes, ( route, name )->=

      params = route.check path

      continue unless params

      search = SearchParams.decode search

      handler: @handlers[ name ]
      request:
        path: path
        search: search
        route: name
        params: _.merge {}, params, search


module.exports = Router
