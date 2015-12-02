describe 'getUrlData', ->

  getUrlData = requireSubject()


  hrefBefore = window.location.href

  before ->

    window.location.href = 'http://foo.com:60/bar'

  after ->

    window.location.href = hrefBefore


  checks = [

    {
      title: 'check'
      input: ''
      output: { protocol: 'http:', host: 'foo.com:60', hostname: 'foo.com', port: '60', pathname: '/bar', search: '', hash: '' }
    }
    {
      title: 'pathname'
      input: '/asd'
      output: { pathname: '/asd' }
    }
    {
      title: 'search'
      input: '?x=1&y=2'
      output: { search: '?x=1&y=2' }
    }
    {
      title: 'hash'
      input: '#bsa'
      output: { hash: '#bsa' }
    }
    {
      title: 'together'
      input: '/asd?x=1&y=2#bsa'
      output: { pathname: '/asd', search: '?x=1&y=2', hash: '#bsa' }
    }
    {
      title: 'hostname'
      input: '//asd.com/bsa'
      output: { hostname: 'asd.com' }
    }

  ]


  _.each checks, ( check )->

    it check.title, ->

      data = getUrlData check.input

      data = _.pick data, _.keys check.output

      expect( data ).eql check.output
