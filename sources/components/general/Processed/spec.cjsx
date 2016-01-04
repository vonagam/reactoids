describe 'Processed', ->

  Processed = requireSubject()


  variants =

    tag: [ 'div', 'span' ]

    source: [ 2, '3', { x: 1 } ]

    process: [ sinon.spy ( source )->= 'x' + JSON.stringify source ]

    'data-unknown': [ 3 ]

  ##


  tests =

    shallow:

      skip: ( input )->=

        _.isUndefined input.process

      ##

      afterEach: ( input )->

        input.process.reset()

      ##

      it: ( input, props, tag )->=

        # process and source

        inner = props.dangerouslySetInnerHTML

        expect( _.isObject inner ).equal true

        expect( _.has inner, '__html' ).equal true

        expect( inner.__html ).equal input.process input.source

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # tag

        expect( tag ).equal input.tag || 'div'

        # data-unknown

        expect( props[ 'data-unknown' ] ).equal input[ 'data-unknown' ]

        # always

        expect( props.className ).string 'processed'

      ##

    ##

    render:

      skip: ( input )->=

        _.isUndefined input.process

      ##

      afterEach: ( input )->

        input.process.reset()

      ##

      it: ( input, component, rerender )->

        expect( input.process ).callCount 1

        input = _.assign {}, input

        expect( ->= input.process.callCount ).not.change.when -> rerender input

        input = _.assign {}, input, source: 'other'

        expect( ->= input.process.callCount ).change.by( 1 ).when -> rerender input

      ##

    ##

  ##


  TestComponent.testComponent Processed, variants, tests

##
