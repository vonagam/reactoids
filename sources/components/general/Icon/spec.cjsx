describe 'Icon', ->

  Icon = requireSubject()


  variants =

    icon: [ 'iknown', 'iunknown' ]

    'data-unknown': [ 3 ]


  tests =

    shallow:

      only: ( input )->=

        true if input.icon

      it: ( input, props, tag )->

        # icon

        known = input.icon == 'iknown'

        expect( props.className ).only( known ).string '-youknown'

        expect( props.className ).only( ! known ).string '-unknown'

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( tag ).equal 'i'

        expect( props.className ).string 'icon'


  options =

    context:

      getClassNames: ( id, constructor, keys )->=

        result = TestComponent.getClassNames id, constructor, keys

        result[ '-iknown' ] = '-youknown'

        result


  TestComponent.testComponent Icon, variants, options, tests
