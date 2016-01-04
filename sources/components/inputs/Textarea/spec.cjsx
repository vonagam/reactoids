describe 'Textarea', ->

  Textarea = requireSubject()


  variants =

    onBlur: [ sinon.spy() ]

    value: [ 'ivalue' ]

    defaultValue: [ 'idefault' ]

    readOnly: [ false, true ]

  ##


  tests =

    shallow:

      it: ( input, props, tag )->

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

        expect( tag ).equal 'textarea'

        expect( props.className ).string 'textarea'

      ##

    ##

    render:

      skip: ( input )->=

        _.any [ input.onBlur ], _.isUndefined

      ##

      afterEach: ( input )->

        _.each [ 'onBlur' ], ( key )-> input[ key ].reset()

      ##

      it: ( input, component )->

        dom = component.dom()

        setValue = sinon.stub component, 'setValue'

        setTempValue = sinon.stub component, 'setTempValue'

        expect( ->= setTempValue.callCount ).change.to( 1 ).when -> TestReact.do.change dom

        expect( ->= input.onBlur.callCount ).change.to( 1 ).when -> TestReact.do.blur dom

        expect( ->= setValue.callCount ).change.by( 1 ).when -> TestReact.do.blur dom

      ##

    ##

  ##


  TestComponent.testComponent Textarea, variants, tests

##
