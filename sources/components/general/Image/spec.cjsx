describe 'Image', ->

  Image = requireSubject()


  variants =

    tag: [ 'img', 'div' ]

    src: [ 'isrc' ]

    style: [ { display: 'none' }, { backgroundImage: 'asd' } ]

    'data-unknown': [ 3 ]


  tests =

    shallow: 

      it: ( input, props, tag )->

        # tag 

        expect( tag ).equal if input.tag then input.tag else 'img'

        # src

        expect( props.className ).only( input.src ).string '-enabled'

        expect( props.className ).only( ! input.src ).string '-disabled'

        # mix

        image = input.tag == undefined || input.tag == 'img'

        if input.src

          expect( props.src ).only( image ).equal input.src

          expect( _.get props, 'style.backgroundImage' ).only( ! image ).equal "url(#{ input.src })"

        else

          expect( props.src ).equal undefined

          expect( _.get props, 'style.backgroundImage' ).equal _.get input, 'style.backgroundImage'

        # style

        expect( _.get props, 'style.display' ).equal _.get input, 'style.display'

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( props.className ).string 'image'


  TestComponent.testComponent Image, variants, tests
