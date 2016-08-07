describe 'Tether', ->

  proxyquire = require( 'proxyquire' ).noCallThru()

  Tether = proxyquire './index.js', tether: {}


  it 'can be static rendered [s]', ->

    props = {

      'className': 'check'

      'children': <div>gogo</div>

      'data-unknown': 3

    }


    instance = shallow <Tether {... props } />


    expect( instance ).to.match 'div.tether.check[data-unknown]'

    expect( instance ).to.contain props.children

  ##

  it 'should be tested better'

##
