describe 'Ajax', ->

  proxyquire = require( 'proxyquire' ).noCallThru()

  simulateLink = sinon.spy()

  AjaxMixin = proxyquire './index.js', '../../various/simulateLink': simulateLink

  AjaxComponent = createMixinClass AjaxMixin()

  $ = requireDependency 'jquery'


  $ajax = undefined

  $abort = undefined

  $options = undefined

  before ->

    $abort = sinon.spy()

    $ajax = sinon.stub $, 'ajax', ( options )->=

      $options = options

      abort: $abort

    ##

  ##

  afterEach ->

    simulateLink.reset()

    $ajax.reset()

    $abort.reset()

    $options = undefined

  ##

  after ->

    $ajax.restore()

  ##


  it 'empty [m]', ->

    input = {}

    instance = mount <AjaxComponent />

    expect( ->= $ajax.callCount ).not.to.change.when -> instance.node.sendAjax 'check', input

  ##


  it 'state and member [m]', ( done )->

    input = { url: '' }

    instance = mount <AjaxComponent />

    expect( instance.node ).to.have.property 'ajaxes'

    expect( instance.node.state ).to.have.property 'ajaxes'


    Promise.resolve()

    .then ->=

      whenPromised [

        expect( ->= _.has instance.node.ajaxes, 'check' ).to.change.to( true )

        expect( ->= _.has instance.node.state.ajaxes, 'check' ).to.change.to( true )

      ], ->

        instance.node.sendAjax 'check', input

      ##

    .then ->=

      whenPromised [

        expect( ->= _.has instance.node.ajaxes, 'check' ).to.change.to( false )

        expect( ->= _.has instance.node.state.ajaxes, 'check' ).to.change.to( false )

      ], ->

        $options.complete()

      ##

    .then done

  ##


  it 'callbacks [m]', ->

    input = {

      success: sinon.spy()

      error: sinon.spy()

      complete: sinon.spy()

    }


    instance = mount <AjaxComponent />

    expect( ->= $ajax.callCount ).to.change.to( 1 ).when -> instance.node.sendAjax 'check', input


    output = $options

    expect( ->= input.success.callCount ).to.change.to( 1 ).when -> output.success {}, 'success', { getResponseHeader: _.noop }

    expect( ->= input.error.callCount ).to.change.to( 1 ).when -> output.error()

    expect( ->= input.complete.callCount ).to.change.to( 1 ).when -> output.complete()

  ##


  variants = {

    force: [

      false

      true

    ]

  }

  options = {

    afterEach: ->

      $ajax.reset()

    ##

  }

  itVariations 'force [m]', variants, options, ( { force } )->

    input = { url: '', force: force }

    instance = mount <AjaxComponent />

    expect( ->= $ajax.callCount ).to.change.to( 1 ).when -> instance.node.sendAjax 'check', input

    expect( $options ).not.to.have.property 'force'

    expect( ->= $ajax.callCount ).onlyIf( force ).to.change.to( 2 ).when -> instance.node.sendAjax 'check', input

    expect( $options ).not.to.have.property 'force'

  ##


  variants = {

    location: [

      'example.com'

    ]

    funced: [

      true

    ]

    redirect: [

      false

      true

      'example.info'

    ]

  }

  options = {

    afterEach: ->

      simulateLink.reset()

    ##

  }

  itVariations 'redirects [m]', variants, options, ( { location, redirect, funced } )->

    input = { url: '', redirect: redirect }

    input.redirect = sinon.spy _.constant redirect if funced


    instance = mount <AjaxComponent />

    instance.node.sendAjax 'check', input


    expect( $options ).not.to.have.property 'redirect'

    expect( $options ).to.have.property 'success'


    data = {}

    status = 'success'

    xhr = getResponseHeader: _.constant location

    $options.success data, status, xhr


    if funced

      expect( input.redirect ).to.have.callCount 1

      expect( input.redirect ).to.have.been.calledWith location, data, status, xhr

    ##


    result = _.funced redirect, location, data, status, xhr

    dom = ReactDOM.findDOMNode instance.node

    if _.isString result

      expect( simulateLink ).to.have.callCount 1

      expect( simulateLink ).to.have.been.calledWith result, dom

    else if result && location

      expect( simulateLink ).to.have.callCount 1

      expect( simulateLink ).to.have.been.calledWith location, dom

    else

      expect( simulateLink ).to.have.callCount 0

    ##

  ##


  it 'isWaitingAjax [m]', ->

    input = { url: '' }

    instance = mount <AjaxComponent />

    expect( instance.node.isWaitingAjax() ).to.be false

    expect( instance.node.isWaitingAjax 'check' ).to.be false

    instance.node.sendAjax 'check', input

    expect( instance.node.isWaitingAjax() ).to.be true

    expect( instance.node.isWaitingAjax 'check' ).to.be true

    $options.complete()

    expect( instance.node.isWaitingAjax() ).to.be false

    expect( instance.node.isWaitingAjax 'check' ).to.be false

  ##


  it 'abortAjax [m]', ->

    input = { url: '' }

    instance = mount <AjaxComponent />

    instance.node.sendAjax 'check', input

    whenPromised [

      expect( ->= $abort.callCount ).to.change.to( 1 )

      expect( ->= instance.node.isWaitingAjax 'check' ).to.change.to( false )

    ], ->

      instance.node.abortAjax 'check'

    ##

  ##


  it 'unmount [m]', ->

    input = { url: '' }

    instance = mount <AjaxComponent />

    instance.node.sendAjax 'check', input

    abort = sinon.spy instance.node, 'abortAjax'

    expect( ->= abort.callCount ).to.change.to( 1 ).when -> instance.unmount()

    expect( abort ).to.be.calledWith 'check'

  ##

##
