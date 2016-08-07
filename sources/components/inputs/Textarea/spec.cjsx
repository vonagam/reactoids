describe 'Textarea', ->

  Textarea = requireSubject()


  variants = {

    onBlur: [ sinon.spy() ]

    value: [ 'ivalue' ]

    defaultValue: [ 'idefault' ]

    readOnly: [ false, true ]

    'data-unknown': [ 3 ]

  }


  itVariations 'renders [s]', variants, ( variation )->

    unknown = variation[ 'data-unknown' ]


    value =

      switch

        when variation.value != undefined then variation.value

        when variation.defaultValue != undefined then variation.defaultValue

        else ''

      ##

    ##


    instance = shallow <Textarea {... variation } />


    expect( instance ).to.match 'textarea.textarea'

    expect( instance ).onlyIf( unknown ).to.have.data 'unknown', unknown

    expect( instance ).to.have.prop 'value', value

    expect( instance ).onlyIf( value ).to.have.className '-value'

    expect( instance ).onlyIf( variation.readOnly ).to.have.className '-readonly'

  ##


  options = {

    skip: ( variation )->=

      _.some _.pick( variation, 'onBlur' ), _.isUndefined

    ##

    afterEach: ( variation )->

      _.each _.pick( variation, 'onBlur' ), _.method 'reset'

    ##

  }

  itVariations 'sets values on change and blur [m]', variants, options, ( variation )->

    instance = mount <Textarea {... variation } />


    setValue = sinon.stub instance.node, 'setValue'

    setTempValue = sinon.stub instance.node, 'setTempValue'


    expect( ->= setTempValue.callCount ).to.change.to( 1 ).when -> instance.simulate 'change'

    expect( ->= variation.onBlur.callCount ).to.change.to( 1 ).when -> instance.simulate 'blur'

    expect( ->= setValue.callCount ).to.change.by( 1 ).when -> instance.simulate 'blur'

  ##

##
