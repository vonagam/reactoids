describe 'classes', ->

  classes = requireSubject()


  checks = [

    { 
      title: 'empty'
      input: []
      output: ''
    }
    {
      title: 'string'
      input: [ 'foo bar' ]
      output: 'foo bar'
    }
    {
      title: 'falseys'
      input: [ 'foo', undefined, false, 'bar', null, 0 ]
      output: 'foo bar'
    }
    {
      title: 'object'
      input: [ 'foo', { asd: false, bar: 1, bsa: undefined } ]
      output: 'foo bar'
    }
    {
      title: 'arrays'
      input: [ [ 'foo' ], [ 'bar' ] ]
      output: 'foo bar'
    }

  ]

  _.each checks, ( check )->

    it "input: #{ check.title }", ->

      expect( classes.apply _, check.input ).equal check.output

    ##

  ##

##
