describe 'AjaxHeaders', ->

  AjaxHeadersMixin = requireSubject()


  funcify = ( bool, value )->=

    if arguments.length == 1

      value = bool

      bool = true

    ##

    if bool

      sinon.spy _.constant value

    else

      value

    ##

  ##

  variants = {

    headersValueFunced: [

      true

      false

    ]

    headersObjectFunced: [

      true

      false

    ]

    filterRequestValue: [

      true

      false

    ]

    crossDomain: [

      true

      false

    ]

  }

  options = {

    'skip': ( { headersValueFunced, headersObjectFunced, crossDomain } )->=

      _.some [ headersValueFunced, headersObjectFunced, crossDomain ], _.isNil

    ##

  }

  itVariations 'works [m]', variants, options, sinon.test ( { headersValueFunced, headersObjectFunced, filterRequestValue, crossDomain } )->

    sinon = this


    value = funcify headersValueFunced, 'value'

    headers = funcify headersObjectFunced, { 'key': value }

    filterRequest = funcify filterRequestValue if filterRequestValue != undefined

    _AjaxHeadersMixin = AjaxHeadersMixin { headers, filterRequest }


    triggerAjaxSendEvent = undefined

    ajaxPrefilter = sinon.stub(

      _AjaxHeadersMixin.mixins[ 0 ].mixins[ 0 ] # TODO: find more elegant solution

      'addEventListener'

      ( key, options )->

        expect( key ).equal 'AjaxHeadersMixin'

        expect( options.event ).equal 'ajaxSend'

        triggerAjaxSendEvent = options.callback

      ##

    )


    AjaxHeadersComponent = createMixinClass _AjaxHeadersMixin

    instance = mount <AjaxHeadersComponent />

    expect( ajaxPrefilter ).to.have.callCount 1


    event = 'event'

    that = instance.node

    xhr = setRequestHeader: sinon.spy()

    ajax = { crossDomain }

    willPass = if filterRequestValue != undefined then filterRequestValue else crossDomain == false


    triggerAjaxSendEvent.call that, event, xhr, ajax


    if filterRequest

      expect( filterRequest ).to.have.callCount 1

      expect( filterRequest ).to.have.been.calledWith that, ajax

    ##

    if headersObjectFunced

      expect( headers ).onlyIf( willPass ).to.have.callCount 1

      expect( headers ).onlyIf( willPass ).to.have.been.calledWith that, ajax

    ##

    if headersValueFunced

      expect( value ).onlyIf( willPass ).to.have.callCount 1

      expect( value ).onlyIf( willPass ).to.have.been.calledWith that, ajax

    ##

    expect( xhr.setRequestHeader ).onlyIf( willPass ).to.have.callCount 1

    expect( xhr.setRequestHeader ).onlyIf( willPass ).to.have.been.calledWith 'key', 'value'


    instance.unmount()

  ##

##
