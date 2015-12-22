describe 'UrlWatcher', ->

  UrlWatcher = requireSubject()


  hrefBefore = window.location.href

  afterEach ->

    window.location.href = hrefBefore


  it 'works', ( done )->

    ARGS = {}

    UrlWatchered = TestMixin.createMixinClass UrlWatcher( ARGS )

    component = TestReact.render <UrlWatchered />

    updateSpy = sinon.spy component, 'forceUpdate'

    setTimeout ->

      expect( updateSpy ).callCount 0

      window.location.href = 'http://foo.bar/'

      setTimeout ->

        expect( updateSpy ).callCount 1

        TestReact.unmount component

        done()

      , 60

    , 60
