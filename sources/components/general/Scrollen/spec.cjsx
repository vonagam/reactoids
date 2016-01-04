describe 'Scrollen', ->

  Scrollen = requireSubject()

  Button = requireSource 'components/general/Button'

  Link = requireSource 'components/general/Link'


  it 'should be better tested'


  variants =

    tag: [ Link, 'span' ]

    'data-unknown': [ 3 ]

  ##


  tests =

    shallow:

      it: ( input, props, tag )->

        # tag

        expect( tag ).equal input.tag || Button

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( props.className ).string 'scrollen'

      ##

    ##

  ##


  TestComponent.testComponent Scrollen, variants, tests

##
