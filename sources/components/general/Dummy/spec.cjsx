describe 'Dummy', ->

  Dummy = requireSubject()


  it 'renders empty div [s]', ->

    instance = shallow <Dummy y='2'><b>world</b></Dummy>


    expect( instance ).to.have.tagName 'div'

    expect( instance ).not.to.have.descendants '*'

    expect( instance ).not.to.have.text()

  ##


  it 'renders empty div [r]', ->

    instance = render <Dummy x='1'><span>hello</span></Dummy>


    expect( instance ).to.have.tagName 'div'

    expect( instance ).not.to.have.descendants '*'

    expect( instance ).not.to.have.text()

  ##


  it 'does not update on props changes [m]', ->

    instance = mount <Dummy />

    renderSpy = sinon.spy instance.node, 'render'


    expect( ->= renderSpy.callCount ).not.to.change.when -> instance.setProps z: 3

  ##

##
