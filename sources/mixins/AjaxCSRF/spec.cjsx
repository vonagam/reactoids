describe.skip 'AjaxCSRF', ->

  AjaxCSRF = requireSubject()


  it 'works', sinon.test ->

    token = 'whatever'

    ajaxOptions = {}

    xhr = setRequestHeader: @spy()

    ARGS = getToken: @spy ->= token


    AjaxCSRFMixin = AjaxCSRF ARGS


    FUNC = undefined

    ajaxPrefilter = @stub AjaxCSRFMixin.mixins[ 0 ], 'addEventListener', ( key, options )->

      expect( key ).equal 'AjaxCSRF'

      expect( options.event ).equal 'ajaxSend'

      FUNC = options.callback

    ##


    AjaxCSRFed = createMixinClass AjaxCSRFMixin


    component = TestReact.render <AjaxCSRFed />


    expect( ajaxPrefilter ).callCount 1


    expect( ->=

      token: { count: ARGS.getToken.callCount, arged: ARGS.getToken.calledWith( component, ajaxOptions ) }

      xhr: { count: xhr.setRequestHeader.callCount, arged: xhr.setRequestHeader.calledWith( 'X-CSRF-Token', token ) }

    ).change.to( token: { count: 1, arged: true }, xhr: { count: 1, arged: true } ).when ->

      FUNC.call component, 'event', xhr, ajaxOptions

    ##


    expect( ->= token: ARGS.getToken.callCount, xhr: xhr.setRequestHeader.callCount ).not.change.when ->

      FUNC.call component, 'event', xhr, { crossDomain: true }

    ##


    TestReact.unmount component

  ##

##
