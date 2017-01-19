describe.skip 'UrlWatcher', ->

  UrlWatcher = requireSubject()

  Location = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location


  hrefBefore = Location.href

  afterEach -> Location.href = hrefBefore


  it 'works', ( done )->

    ARGS = {}

    UrlWatchered = createMixinClass UrlWatcher( ARGS )

    component = TestReact.render <UrlWatchered />

    updateSpy = sinon.spy component, 'forceUpdate'

    setTimeout ->

      expect( updateSpy ).callCount 0

      Location.href = 'http://foo.bar/'

      setTimeout ->

        expect( updateSpy ).callCount 1

        TestReact.unmount component

        done()

      , 60

    , 60

  ##

##
