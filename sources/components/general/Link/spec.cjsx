describe 'Link', ->

  Link = requireSubject()


  hrefBefore = window.location.href

  before ->

    window.location.href = 'http://asd.com'

  after ->

    window.location.href = hrefBefore


  SAME_HREFS = [ '', '/', 'http://asd.com', 'http://asd.com/?#' ]

  OTHER_HREFS = [ '/asd', 'https://asd.com', 'http://asd.com:60', 'http://foo.bar' ]


  variants =

    href: SAME_HREFS.concat OTHER_HREFS

    isCurrent: [ false, true, sinon.spy _.random ]

    'data-unknown': [ 3 ]


  tests =

    shallow:

      afterEach: ( input )->

        input.isCurrent.reset() if _.isFunction input.isCurrent

      it: ( input, props, tag )->

        # href

        if _.isString input.href

          expect( props.href ).equal input.href

          expect( props.className ).string '-enabled'            

        else

          expect( props.href ).equal undefined

          expect( props.className ).string '-disabled'

        # mix

        if _.isString input.href

          if input.isCurrent != undefined

            if _.isFunction input.isCurrent

              expect( input.isCurrent ).callCount 1

              isCurrent = input.isCurrent.returnValues[ 0 ]

            else

              isCurrent = input.isCurrent

          else

            isCurrent = _.includes SAME_HREFS, input.href

        else

          if _.isFunction input.isCurrent

            expect( input.isCurrent ).callCount 0

          isCurrent = false

        if isCurrent

          expect( props.className ).string '-current'

        else

          expect( props.className ).not.string '-current'

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( tag ).equal 'a'

        expect( props.className ).string 'link'


  TestComponent.testComponent Link, variants, tests
