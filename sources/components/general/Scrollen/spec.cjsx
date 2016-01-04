describe 'Scrollen', ->

  Scrollen = requireSubject()


  it 'should be better tested'


  variants =

    'data-unknown': [ 3 ]

  ##


  tests =

    shallow:

      it: ( input, props, tag )->

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( props.className ).string 'scrollen'

      ##

    ##

  ##


  TestComponent.testComponent Scrollen, variants, tests

##
