describe 'EventListener', ->

  dependencies = requireSource 'dependencies'

  jQuery = { on: _.noop, off: _.noop }

  EventListener = undefined

  jQueryBefore = dependencies[ 'jquery' ]

  before ->

    dependencies[ 'jquery' ] = ->= jQuery

    EventListener = requireSubject()

  ##

  after ->

    dependencies[ 'jquery' ] = jQueryBefore

    EventListener = undefined

  ##


  it 'works', sinon.test ->

    addStub = @stub jQuery, 'on'

    removeStub = @stub jQuery, 'off'


    EventListenered = TestMixin.createMixinClass EventListener

    component = TestReact.render <EventListenered x={ 1 } />


    callback = @spy -> expect( this.props.x ).equal 1


    expect( ->= count: addStub.callCount, evented: addStub.calledWith 'someEvent' ).change

    .from( count: 0, evented: false ).to( count: 1, evented: true ).when ->

      component.addEventListener 'someListener', event: 'someEvent', callback: callback

    ##


    expect( ->= callback.callCount ).change

    .from( 0 ).to( 1 ).when ->

      addStub.firstCall.args[ 1 ]()

    ##


    expect( ->= count: removeStub.callCount, evented: removeStub.calledWith 'someEvent' ).change

    .from( count: 0, evented: false ).to( count: 1, evented: true ).when ->

      component.removeEventListener 'someListener'

    ##

  ##

##
