describe 'getUrlData', ->

  getUrlData = requireSubject()

  # location = https://reactoids.com/tests


  checks = [

    {

      title: 'check'

      input: ''

      output: { protocol: 'https:', host: 'reactoids.com', hostname: 'reactoids.com', port: '', pathname: '/tests', search: '', hash: '' }

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

      expect( data ).to.deep.equal check.output

    ##

  ##

##
