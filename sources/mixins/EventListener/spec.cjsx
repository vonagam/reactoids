describe 'EventListener', ->

  EventListener = requireSubject()


  it 'works', ->

    EventListenered = TestMixin.createMixinClass EventListener

    component = TestReact.render <EventListenered />

    addStub = sinon.stub document, 'addEventListener'

    removeStub = sinon.stub document, 'removeEventListener'

    callback = ->


    expect( addStub ).callCount 0

    component.addEventListener 'someListener', {

      event: 'someEvent'
      callback: callback

    }

    expect( addStub ).callCount 1

    expect( addStub.calledWith 'someEvent', callback ).true


    expect( removeStub ).callCount 0

    component.removeEventListener 'someListener'

    expect( removeStub ).callCount 1

    expect( removeStub.calledWith 'someEvent', callback ).true


    addStub.restore()

    removeStub.restore()
