describe.skip 'EventListener', ->

  proxyquire = require( 'proxyquire' ).noCallThru()

  jQuery = { on: _.noop, off: _.noop }

  EventListener = proxyquire './index.js', 'jquery': jQuery


  it 'works', sinon.test ->

    onStub = @stub jQuery, 'on'

    offStub = @stub jQuery, 'off'


    EventListenered = createMixinClass EventListener()

    component = TestReact.render <EventListenered x={ 1 } />


    callback = @spy -> expect( this.props.x ).equal 1


    expect( ->= count: onStub.callCount, evented: onStub.calledWith 'someEvent' ).change

    .from( count: 0, evented: false ).to( count: 1, evented: true ).when ->

      component.addEventListener 'someListener', event: 'someEvent', callback: callback

    ##


    expect( ->= callback.callCount ).change

    .from( 0 ).to( 1 ).when ->

      onStub.firstCall.args[ 1 ]()

    ##


    expect( ->= count: offStub.callCount, evented: offStub.calledWith 'someEvent' ).change

    .from( count: 0, evented: false ).to( count: 1, evented: true ).when ->

      component.removeEventListener 'someListener'

    ##

  ##

##
