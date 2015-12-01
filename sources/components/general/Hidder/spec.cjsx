describe 'Hidder', ->

  Hidder = requireSubject()


  variants =

    children: [ 'ichildren' ]

    hide: [ false, true ]

    'data-unknown': [ 3 ]


  tests =

    shallow: 

      it: ( input, props, tag )->

        # hide

        hide = input.hide

        expect( props.className ).only( hide ).string '-hidding'

        expect( props.className ).only( ! hide ).string '-showing'

        expect( props.children ).eql if hide then undefined else input.children

        # data-unknown

        expect( props[ 'data-unknown' ] ).eql input[ 'data-unknown' ]

        # always

        expect( tag ).equal 'div'

        expect( props.className ).string 'hidder'


  TestComponent.testComponent Hidder, variants, tests
