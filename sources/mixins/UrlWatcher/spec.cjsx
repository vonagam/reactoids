describe.skip 'UrlWatcher', ->

  UrlWatcher = requireSubject()

  windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location


  hrefBefore = windowLocation.href

  afterEach ->

    windowLocation.href = hrefBefore

  ##


  it 'works', ( done )->

    ARGS = {}

    UrlWatchered = createMixinClass UrlWatcher( ARGS )

    component = TestReact.render <UrlWatchered />

    updateSpy = sinon.spy component, 'forceUpdate'

    setTimeout ->

      expect( updateSpy ).callCount 0

      windowLocation.href = 'http://foo.bar/'

      setTimeout ->

        expect( updateSpy ).callCount 1

        TestReact.unmount component

        done()

      , 60

    , 60

  ##

##
