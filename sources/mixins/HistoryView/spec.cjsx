describe.skip 'HistoryView', ->

  HistoryView = requireSubject()

  window = requireWindow 'window' # https://developer.mozilla.org/en-US/docs/Web/API/Window

  windowHistory = requireWindow 'history' # https://developer.mozilla.org/en-US/docs/Web/API/History

  windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location


  hrefBefore = windowLocation.href

  before ->

    windowLocation.href = 'http://foo.bar'

  ##

  after ->

    windowLocation.href = hrefBefore

  ##


  it 'works', ->

    ARGS =

      getHistoryId: 'myId'

      getHistoryData: sinon.spy ( that )->= that.state.history

      handleHistoryData: sinon.spy ( that, data, callback )->= that.setState history: data, callback

      handleLink: ( that, link, inDomain )->=

        that.setState history: 'finish', ->

          that.changeHistoryState 'push', url: 'myUrl', title: 'myTitle'

        ##

        return true

      ##

    ##


    HistoryViewed = createMixinClass HistoryView( ARGS ),

      getInitialState: ->=

        history: 'start'

      ##

    ##


    stubs =

      pushState: sinon.stub windowHistory, 'pushState'

      replaceState: sinon.stub windowHistory, 'replaceState'

      addEventListener: sinon.stub window, 'addEventListener'

    ##


    component = TestReact.render <HistoryViewed><a href='http://foo.bar/hello/world' /></HistoryViewed>


    expect( ARGS.getHistoryData ).callCount 2

    expect( ARGS.handleHistoryData ).callCount 0

    expect( stubs.pushState ).callCount 0

    expect( stubs.replaceState ).callCount 1

    #expect( stubs.addEventListener ).callCount 1 React scroll listening

    expect( stubs.replaceState.getCall( 0 ).args ).eql(

      [ { HistoryViewMixin: true, index: 0, datas: { myId: 'start' } }, undefined, undefined ]

    )


    TestReact.$( component ).find( 'a' ).trigger 'click'


    expect( ARGS.getHistoryData ).callCount 3

    expect( ARGS.handleHistoryData ).callCount 0

    expect( stubs.pushState ).callCount 1

    expect( stubs.replaceState ).callCount 1

    #expect( stubs.addEventListener ).callCount 1

    expect( stubs.pushState.getCall( 0 ).args ).eql(

      [ { HistoryViewMixin: true, index: 1, id: 'myId', datas: { myId: 'finish' } }, 'myTitle', 'myUrl' ]

    )


    stubs.addEventListener.lastCall.args[ 1 ](

      { state: { HistoryViewMixin: true, index: 0, datas: { myId: 'start' } } }

    )


    expect( ARGS.getHistoryData ).callCount 3

    expect( ARGS.handleHistoryData ).callCount 1

    expect( stubs.pushState ).callCount 1

    expect( stubs.replaceState ).callCount 1

    #expect( stubs.addEventListener ).callCount 1

    expect( ARGS.handleHistoryData.calledWith( component, 'start' ) ).equal true


    _.each stubs, ( stub )-> stub.restore()

    TestReact.unmount component

  ##

##
