describe 'watchUrlChange', ->

  this.slow 75 + 51

  watchUrlChange = requireSubject()

  serverSide = requireSource 'serverSide'


  changeUrl = ( url )->

    serverSide.href = url


  before ->

    changeUrl 'first'

  after ->

    changeUrl ''


  it 'works', ( done )->

    callback = sinon.spy ( newLocation, oldLocation )-> 

      expect( oldLocation.href ).equal 'first'

      expect( newLocation.href ).equal 'second'

    watchUrlChange callback, true

    changeUrl 'second'

    expect( callback.called ).equal false

    setTimeout ->

      expect( callback.calledOnce ).equal true

      watchUrlChange callback, false

      done()

    , 51
