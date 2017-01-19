describe.skip 'Input', ->

  Input = requireSubject()

  Inputed = createMixinClass Input()


  input = undefined

  onChange = sinon.spy()

  afterEach ->

    onChange.reset()

    return unless input

    TestReact.unmount input

    input = undefined

  ##


  _.each [

    { props: {}, value: undefined }
    { props: { defaultValue: 1 }, value: 1 }
    { props: { value: 2 }, value: 2 }
    { props: { value: 3, defaultValue: 4 }, value: 3 }

  ], ( check )->

    { props, value } = check

    it "getValue from props: #{ _.keys( props ).join ' and ' }", ->

      input = TestReact.render <Inputed {... props } />

      expect( input.getValue() ).equal value

    ##

  ##


  it 'onChange', ->

    input = TestReact.render <Inputed onChange={ onChange } inputDelay={ 0 } />

    input.setValue 3

    expect( onChange ).callCount 1

    expect( onChange.calledWith 3 ).true

    input.setTempValue 4

    expect( onChange ).callCount 2

    expect( onChange.calledWith 4 ).true

  ##


  it 'onChange and inputDelay', ( done )->

    input = TestReact.render <Inputed onChange={ onChange } inputDelay={ 1 } />

    input.setValue 3

    expect( onChange ).callCount 1

    input.setTempValue 4

    expect( onChange ).callCount 1

    setTimeout ->

      expect( onChange ).callCount 2

      expect( onChange.calledWith 4 ).true

      done()

    , 4

  ##


  it 'onChange and negative inputDelay', ( done )->

    input = TestReact.render <Inputed onChange={ onChange } inputDelay={ -1 } />

    input.setValue 3

    expect( onChange ).callCount 1

    input.setTempValue 4

    expect( onChange ).callCount 1

    setTimeout ->

      expect( onChange ).callCount 1

      done()

    , 4

  ##


  it 'onTempChange', ->

    input = TestReact.render <Inputed onTempChange={ onChange } inputDelay={ 0 } />

    input.setValue 3

    input.setTempValue 4

    expect( onChange ).callCount 0

  ##


  it 'onTempChange and inputDelay', ->

    input = TestReact.render <Inputed onTempChange={ onChange } inputDelay={ 1 } />

    input.setValue 3

    expect( onChange ).callCount 0

    input.setTempValue 4

    expect( onChange ).callCount 1

    expect( onChange.calledWith 4 ).true

  ##


  it 'readOnly', ->

    input = TestReact.render <Inputed onChange={ onChange } onTempChange={ onChange } readOnly={ true } />

    input.setValue 3

    input.setTempValue 4

    expect( onChange ).callCount 0

  ##


  it 'getValue', ( done )->

    input = TestReact.render <Inputed value={ 3 } inputDelay={ 1 } />

    input.setValue 2

    expect( input.getValue() ).equal 3

    input.setTempValue 4

    expect( input.getValue() ).equal 4

    setTimeout ->

      expect( input.getValue() ).equal 3

      done()

    , 4

  ##

##

