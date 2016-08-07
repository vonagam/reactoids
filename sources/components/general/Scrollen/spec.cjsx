describe 'Scrollen', ->

  Scrollen = requireSubject()


  it 'can be static rendered [s]', ->

    props = {

      'className': 'check'

      'onReveal': _.noop

      'children': <div>gogo</div>

      'data-unknown': 3

    }


    instance = shallow <Scrollen {... props } />


    expect( instance ).to.match 'div.scrollen.check[data-unknown]'

    expect( instance ).to.contain props.children

  ##

  it 'should be tested better'

##
