describe 'Paginator', ->

  Paginator = requireSubject()


  variants =

    current: [ 0, 3, 6, 11 ]
    
    total: [ 12, 17 ]

    size: [ 2, 4, 9 ]

    url: [ ( page )->= "url#{ page }" ]

    'data-unknown': [ 3 ]


  tests =

    shallow:

      skip: ( input )->=

        _.any _.pick( input, 'current', 'total', 'size', 'url' ), _.isUndefined

      it: ( input, props, tag )->=

        # current

        current = input.current

        total = input.total

        onEdge = current == 0 || current == total - 1

        names = _.pluck props.children, 'props.className'

        expect( _.count names, 'button -number -disabled -current' ).equal 1

        expect( _.count names, 'button -named -disabled -current' ).equal + onEdge

        expect( _.count names, 'button -named -disabled' ).equal + onEdge

        hrefs = _.pluck props.children, 'props.href'

        expect( _.count hrefs, input.url current ).equal 0

        expect( _.count hrefs, input.url current - 1 ).equal 2 * ( current != 0 )

        expect( _.count hrefs, input.url current + 1 ).equal 2 * ( current != total - 1 )

        # size

        all = 4 + input.total

        min = 4 + 1 + ( input.size + 1 ) * 2

        size = Math.min min, all

        expect( props.children.length ).equal size

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        strings = _.pluck props.children, 'props.children'

        strings = _.filter strings, _.isString

        expect( strings ).length 4

        expect( _.uniq strings ).length strings.length

        expect( _.intersection strings, [ '#first', '#prev', '#next', '#last' ] ).length strings.length

        expect( tag ).equal 'div'

        expect( props.className ).string 'paginator'


  TestComponent.testComponent Paginator, variants, tests
