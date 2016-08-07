describe 'YaShare', ->

  YaShare = requireSubject()

  Dummy = requireSource 'components/general/Dummy'


  it 'renders div.yaShare with Dummy inside [s]', ->

    props = {

      'className': 'check'

      'data-unknown': 3

    }


    instance = shallow <YaShare {... props } />


    expect( instance ).to.match 'div.ya_share.check[data-unknown]'

    expect( instance ).to.contain <Dummy />

    expect( instance ).not.to.have.text()

  ##

  describe 'mounts [m]', ->

    afterEach ->

      window.Ya = undefined

    ##

    it 'adds scripts and calls Ya.share2 after their loading', sinon.test ->

      sinon = this


      appendChild = sinon.stub document.getElementsByTagName( 'head' )[ 0 ], 'appendChild'

      expect( ->= appendChild.callCount ).to.change.by( 2 ).when ->

        mount <YaShare />

      ##


      share2 = ( window.Ya = {} ) && ( window.Ya.share2 = sinon.spy() )

      expect( ->= share2.callCount ).to.change.by( 1 ).when ->

        _.each appendChild.getCalls(), ( call )-> call.args[ 0 ].onload()

      ##

    ##

    it 'does not add scripts if Ya.share2 is present', sinon.test ->

      sinon = this


      appendChild = sinon.stub document.getElementsByTagName( 'head' )[ 0 ], 'appendChild'

      share2 = ( window.Ya = {} ) && ( window.Ya.share2 = sinon.spy() )


      mount <YaShare />


      expect( appendChild ).to.have.callCount 0

      expect( share2 ).to.have.callCount 1

    ##

    it 'passes params', ->

      props = { content: { description: 'check' }, theme: { size: 'm' } }

      share2 = ( window.Ya = {} ) && ( window.Ya.share2 = sinon.spy() )


      mount <YaShare {... props } />


      result = share2.getCall( 0 ).args[ 1 ]

      expect( _.isEqualPick props, result, [ 'content', 'theme' ] ).to.be.true

    ##

    it 'calls hooks', ->

      props = { hooks: { onshare: sinon.spy() } }

      onShare = props.hooks.onshare

      share2 = ( window.Ya = {} ) && ( window.Ya.share2 = sinon.spy() )


      mount <YaShare {... props } />


      expect( ->= onShare.callCount ).to.change.from( 0 ).to( 1 ).when ->

        share2.getCall( 0 ).args[ 1 ].hooks.onshare 'fake'

      ##

      expect( onShare ).calledWithExactly 'fake'

    ##

  ##

##
