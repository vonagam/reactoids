SearchParams = §require 'various/search_params'


class Route

  constructor: ( path_scheme, options = {} )->

    @captures = []

    @constraints = options.constraints || {}

    @defaults = options.defaults || {}

    @path_checker = 
      path_scheme
      .replace /:/g, '§'
      .replace /\(([^)]*)\)/g, "(?:$1)?"
      .replace /\./g, '\\.'
      .replace /§(\w+)/g, ( match, name )=>

        @captures.push name

        @constraints[ name ] || '([\\w_-]+)'

    @path_checker = RegExp '^' + @path_checker + '$'

    return

  check: ( path )->

    match = path.match @path_checker

    return unless match

    params = {}

    for name, index in @captures

      if value = match[ index + 1 ]

        params[ name ] = value

    return params


class Router

  constructor: ( handlers = {} )->

    @routes = {}
    @handlers = {}

    @add handlers

    return

  add: ( handlers )->

    for name, handler of handlers

      if _.isArray handler

        options = handler[ 1 ]
        handler = handler[ 0 ]

      else 

        options = {}

      @routes[ name ] = new Route Routes[ name ].toString(), options
      @handlers[ name ] = handler

    return

  run: ( url, callback )->

    path = url.match( /^[^?]+/ )[ 0 ]
    search = url.slice path.length

    for name, route of @routes

      params = route.check path

      continue unless params

      search = SearchParams.decode search

      return { 

        handler: @handlers[ name ]
        request:
          path: path
          route: name
          search: search
          params: _.merge params, search

      }

    return


§export Router
