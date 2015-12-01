describe 'backgroundImage', ->

  backgroundImage = requireSubject()


  checks = [

    {
      title: 'falsey'
      inputs: [ undefined, null, false, 0, '' ]
      output: ( input )->= undefined
    }
    {
      title: 'truthy'
      inputs: [ true, 1, 'string' ]
      output: ( input )->= { backgroundImage: "url(#{ input })" }
    }

  ]


  _.each checks, ( check )->

    _.each check.inputs, ( input )->

      it "#{ check.title } input: #{ input }", ->

        expect( backgroundImage input ).eql check.output( input )
