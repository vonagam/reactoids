describe 'backgroundImage', ->

  backgroundImage = requireSubject()


  variants = {

    input: [ null, false, 0, '', true, 1, 'string' ]

  }


  itVariations 'works', variants, ( variation )->

    { input } = variation


    result = backgroundImage input


    if input

      expect( result ).to.deep.equal { backgroundImage: "url(#{ input })" }

    else

      expect( result ).to.be.undefined

    ##

  ##

##
