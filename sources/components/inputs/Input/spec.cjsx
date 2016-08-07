describe 'Input', ->

  Input = requireSubject()


  variants = {

    type: [ 'text', 'number' ]

    onBlur: [ sinon.spy() ]

    onKeyDown: [ sinon.spy() ]

    onSubmit: [ sinon.spy() ]

    value: [ 'ivalue' ]

    defaultValue: [ 'idefault' ]

    readOnly: [ false, true ]

    'data-unknown': [ 3 ]

  }


  shallowVariants = _.omit variants, [ 'onBlur', 'onKeyDown', 'onSubmit' ]

  itVariations 'renders [s]', renderVariants, ( variation )->

    value = variation.value || variation.defaultValue || ''


    instance = shallow <Input {... variation } />


    expect( instance ).to.match 'input.input'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]

    expect( instance ).to.have.attr 'type', variation.type || 'text'

    expect( instance ).to.have.attr 'value', value

    expect( instance ).onlyIf( value ).to.have.className '-value'

    expect( instance ).onlyIf( variation.readOnly ).to.have.className '-readonly'

  ##

  ###

    render:

      skip: ( input )->=

        _.some [ input.onBlur, input.onKeyDown, input.onSubmit ], _.isUndefined

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

  ###

##
