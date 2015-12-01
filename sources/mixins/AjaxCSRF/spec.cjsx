describe 'AjaxCSRF', ->

  AjaxCSRF = requireSubject()


  it 'works', ->

    token = 'whatever'

    ajaxOptions = {}

    ajaxOriginalOptions = {}

    xhr = setRequestHeader: sinon.spy()

    ARGS = getToken: sinon.spy ->= token

    
    FUNC = undefined

    ajaxPrefilter = sinon.stub $, 'ajaxPrefilter', ( func )->

      FUNC = func


    AjaxCSRFed = TestMixin.createMixinClass AjaxCSRF ARGS

    component = TestReact.render <AjaxCSRFed />


    expect( ajaxPrefilter ).callCount 1

    FUNC ajaxOptions, ajaxOriginalOptions, xhr

    expect( ARGS.getToken ).callCount 1

    expect( ARGS.getToken.calledWith component, ajaxOptions, ajaxOriginalOptions ).true

    expect( xhr.setRequestHeader ).callCount 1

    expect( xhr.setRequestHeader.calledWith 'X-CSRF-Token', token ).true


    FUNC { crossDomain: true }, ajaxOriginalOptions, xhr

    expect( ARGS.getToken ).callCount 1

    expect( xhr.setRequestHeader ).callCount 1


    ajaxPrefilter.restore()

    TestReact.unmount component
