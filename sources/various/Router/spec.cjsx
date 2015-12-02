describe 'Router', ->

  dependencies = requireSource 'dependencies'

  router = undefined

  hrefBefore = window.location.href


  before ->

    dependencies[ 'js-routes' ] = { 

      inRoutes: '/defined/in/routes'

    }

    Router = requireSubject()

    router = new Router {

      inRoutes: 0
      '/one': 1
      '/two/:asd': 2
      '/three(/:asd)': 3
      '/four(/:asd)': [ 4, { defaults: { asd: 'def' } } ]
      '/five/:asd': [ 5, { constraints: { asd: 'sin|cos' } } ]

    }

    window.location.href = 'http://foo.bar/'

  after ->

    dependencies[ 'js-routes' ] = undefined

    router = undefined

    window.location.href = hrefBefore


  checks = [

    {
      title: 'zero: unknown path'
      input: '/zero'
      output: undefined
    }
    {
      title: 'zero: in Routes'
      input: '/defined/in/routes'
      output: { handler: 0 }
    }
    {
      title: 'one: simple'
      input: '/one'
      output: { handler: 1 }
    }
    {
      title: 'two: param in url'
      input: '/two/yes'
      output: { handler: 2, request: { search: {}, params: { asd: 'yes' } } }
    }
    {
      title: 'two: param in url and search'
      input: '/two/yes?asd=no'
      output: { request: { search: { asd: 'no' }, params: { asd: 'no' } } }
    }
    {
      title: 'three: optional param is present'
      input: '/three/yes'
      output: { handler: 3, request: { params: { asd: 'yes' } } }
    }
    {
      title: 'three: optional param is absent'
      input: '/three'
      output: { handler: 3, request: { params: {} } }
    }
    {
      title: 'four: optional defaulted param is present'
      input: '/four/yes'
      output: { handler: 4, request: { params: { asd: 'yes' } } }
    }
    {
      title: 'four: optional defaulted param is absent'
      input: '/four'
      output: { handler: 4, request: { params: { asd: 'def' } } }
    }
    {
      title: 'five: constrained param is fitting'
      input: '/five/cos'
      output: { handler: 5 }
    }
    {
      title: 'five: constrained param is not fitting'
      input: '/five/yes'
      output: undefined
    }

  ]


  _.each checks, ( check )->

    it check.title, ->

      result = router.run check.input

      output = check.output

      return expect( result ).equal undefined if output == undefined

      expect( result ).not.equal undefined

      expect( result.handler ).equal output.handler if output.handler

      expect( _.pick result.request, _.keys output.request ).eql output.request if output.request
