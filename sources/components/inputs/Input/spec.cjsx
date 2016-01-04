describe 'Input', ->

  Input = requireSubject()


  variants =

    type: [ 'text', 'number' ]

    onBlur: [ sinon.spy() ]

    onKeyDown: [ sinon.spy() ]

    onSubmit: [ sinon.spy() ]

    value: [ 'ivalue' ]

    defaultValue: [ 'idefault' ]

    readOnly: [ false, true ]

  ##


  tests =

    shallow:

      it: ( input, props, tag )->

        # type

        expect( props.type ).equal input.type || 'text'

        # value and defaultValue

        value = ''

        if input.value != undefined

          value = input.value

        else if input.defaultValue != undefined

          value = input.defaultValue

        ##

        expect( props.value ).equal value

        expect( props.className ).only( value ).string '-value'

        # readOnly

        expect( props.className ).only( input.readOnly ).string '-readonly'

        # always

        expect( tag ).equal 'input'

        expect( props.className ).string 'input'

      ##

    ##

    render:

      skip: ( input )->=

        _.any [ input.onBlur, input.onKeyDown, input.onSubmit ], _.isUndefined

      ##

      afterEach: ( input )->

        _.each [ 'onBlur', 'onKeyDown', 'onSubmit' ], ( key )-> input[ key ].reset()

      ##

      it: ( input, component )->

        dom = component.dom()

        setValue = sinon.stub component, 'setValue'

        setTempValue = sinon.stub component, 'setTempValue'

        expect( ->= setTempValue.callCount ).change.to( 1 ).when -> TestReact.do.change dom

        expect( ->= input.onBlur.callCount ).change.to( 1 ).when -> TestReact.do.blur dom

        expect( ->= setValue.callCount ).change.by( 1 ).when -> TestReact.do.blur dom

        expect( ->= input.onKeyDown.callCount ).change.to( 1 ).when -> TestReact.do.keyDown dom

        expect( ->= input.onSubmit.callCount ).change.to( 1 ).when -> TestReact.do.keyDown dom, key: 'Enter'

      ##

    ##

  ##


  TestComponent.testComponent Input, variants, tests

##
