describe 'BaseListener', ->

  BaseListener = requireSubject()


  initListener = sinon.spy()

  toggleListener = sinon.spy()

  component = undefined

  afterEach ->

    initListener.reset()

    toggleListener.reset()

    if component

      TestReact.unmount component

      component = undefined

    ##

  ##

  expectSpies = ( listener, init, toggle, action )->

    beforeInits = initListener.callCount

    beforeToggles = toggleListener.callCount

    action()

    if init != null

      expect( initListener ).callCount beforeInits + 1

      expect( initListener.getCall( beforeInits ).calledWith component, listener ).true

    else

      expect( initListener ).callCount beforeInits

    ##

    if toggle != null

      expect( toggleListener ).callCount beforeToggles + 1

      expect( toggleListener.getCall( beforeToggles ).calledWith component, listener, toggle ).true

    else

      expect( toggleListener ).callCount beforeToggles

    ##

  ##


  it 'single', ->

    BaseListenered = TestMixin.createMixinClass BaseListener( 

      name: 'single'
      multiplyListeners: false
      initListener: initListener
      toggleListener: toggleListener

    )

    component = TestReact.render <BaseListenered />


    listener1 = {}

    expectSpies listener1, true, true, -> component.addSingleListener listener1

    expectSpies listener1, null, null, -> component.toggleSingleListener true

    expectSpies listener1, null, false, -> component.removeSingleListener()


    listener2 = { turned: false }

    expectSpies listener2, true, null, -> component.addSingleListener listener2

    expectSpies listener2, null, null, -> component.removeSingleListener()

  ##


  it 'single redefining warn', ->

    BaseListenered = TestMixin.createMixinClass BaseListener( 

      name: 'single'
      multiplyListeners: false
      initListener: initListener
      toggleListener: toggleListener

    )

    component = TestReact.render <BaseListenered />

    component.addSingleListener {}

    stub = sinon.stub console, 'warn'

    component.addSingleListener {}

    expect( stub ).callCount 1

    expect( stub.calledWith 'listener already exists' ).true

    stub.restore()

  ##


  it 'multiply', ->

    BaseListenered = TestMixin.createMixinClass BaseListener( 

      name: 'multiply'
      multiplyListeners: true
      initListener: initListener
      toggleListener: toggleListener

    )

    component = TestReact.render <BaseListenered />


    listener1 = {}

    expectSpies listener1, true, true, -> component.addMultiplyListener 'withKey', listener1


    listener2 = { turned: false }

    expectSpies listener2, true, null, -> component.addMultiplyListener 'againKey', listener2

    expectSpies listener2, null, true, -> component.toggleMultiplyListener 'againKey', true

    expectSpies listener2, null, false, -> component.toggleMultiplyListener 'againKey', false


    listener3 = {}

    expectSpies listener3, true, true, -> component.addMultiplyListener listener3


    expectSpies listener1, null, false, -> component.removeMultiplyListener 'withKey'

    expectSpies listener2, null, null, -> component.removeMultiplyListener 'againKey'

  ##


  it 'multiply redefining warn', ->

    BaseListenered = TestMixin.createMixinClass BaseListener( 

      name: 'multiply'
      multiplyListeners: true
      initListener: initListener
      toggleListener: toggleListener

    )

    component = TestReact.render <BaseListenered />

    component.addMultiplyListener 'someKey', {}

    stub = sinon.stub console, 'warn'

    component.addMultiplyListener 'someKey', {}

    expect( stub ).callCount 1

    expect( stub.calledWith "listener with key 'someKey' already exists" ).true

    stub.restore()

  ##

##
