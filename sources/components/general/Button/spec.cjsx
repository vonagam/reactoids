describe 'Button', ->

  Button = requireSubject()


  variants =

    href: [ '', 'ihref' ]

    onClick: [ sinon.spy() ]

    ajax: [ {}, { a: 1 }, ( ->= {} ), ( ->= { a: 1 } ) ]

    text: [ 'itext' ]

    children: [ 'ichildren' ]

    'data-unknown': [ 3 ]

  ##


  tests =

    shallow: 

      it: ( input, props, tag )->

        # href

        if _.isString input.href

          expect( tag ).equal 'a'

          expect( props.href ).equal input.href

        else

          expect( tag ).equal 'span'

          expect( props.href ).equal undefined

        ##

        # text

        if input.text

          expect( props.children ).equal input.text

        else

          expect( props.children ).equal input.children

        ##

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # mix

        enabled = _.isString( input.href ) || input.onClick || ! _.isEmpty _.funced input.ajax

        expect( props.className ).only( enabled ).string '-enabled'

        expect( props.className ).only( ! enabled ).string '-disabled'

        # always

        expect( props.className ).string 'button'

        expect( props.className ).not.string '-waiting'

      ##

    ##

    onClick: (->=

      ajaxStub = undefined

      before: ->

        ajaxStub = sinon.stub $, 'ajax', ->= { abort: _.noop }

      ##

      afterEach: ( input )->

        ajaxStub.reset()

        input.onClick.reset() if input.onClick

      ##

      after: ->

        ajaxStub.restore()

      ##

      it: ( input, component )->

        ajaxSpy = sinon.spy component, 'sendAjax'

        willAjax = ! _.isEmpty _.funced input.ajax

        dom = component.dom()

        expect( dom.className ).not.string '-waiting'

        TestReact.do.click dom

        expect( ajaxStub ).callCount if willAjax then 1 else 0

        expect( ajaxSpy ).callCount if willAjax then 1 else 0

        expect( ajaxSpy ).calledWith 'one', _.funced input.ajax if willAjax

        expect( dom.className ).only( willAjax ).string '-waiting'

        expect( input.onClick ).callCount 1 if input.onClick 

    )()

  ##


  TestComponent.testComponent Button, variants, tests

##
