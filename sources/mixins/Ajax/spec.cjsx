describe.skip 'Ajax', ->

  Ajax = requireSubject()

  Ajaxed = createMixinClass Ajax

  $ = requireDependency 'jquery'

  window = requireDependency 'window' # location


  $options = undefined

  $ajax = undefined

  $abort = undefined

  before ->

    $abort = sinon.spy()

    $ajax = sinon.stub $, 'ajax', ( options )->=

      $options = options

      abort: $abort

    ##

  ##

  afterEach ->

    $ajax.reset()

    $abort.reset()

  ##

  after ->

    $ajax.restore()

  ##

  ###


  checks = {

    'onSuccess':
      input:
        onSuccess: sinon.spy()

      ##
      output: ( input, output )->=
        success: input.onSuccess
        complete: output.complete

      ##

    ##

    'type':
      input:
        type: 'asd'

      ##
      output: ( input, output )->=
        method: 'ASD'
        complete: output.complete

      ##

    ##

    'redirect true':
      input:
        redirect: true

      ##
      output: ( input, output )->=
        success: output.success
        complete: output.complete

      ##

    ##

    'redirect string'
      input:
        redirect: 'http://foo.bar/'

      ##
      output: ( input, output )->=
        success: output.success
        complete: output.complete

  }


  checks = [

    ->=

      i =
        unknown: 34
        url: 'asd'
        onSuccess: -> 1
        complete: -> 2

      ##

      input: i
      output: o

  ]


  it 'works', ->




    component = TestReact.render <Ajaxed />


    abort = sinon.spy()

    ajax = sinon.stub $, 'ajax', ->=

      abort: abort

    ##


    options = {

      url: '/asd'
      unknown: 34
      onSuccess: sinon.spy()
      complete: sinon.spy()

    }


    component.sendAjax 'check', options


    expect( ajax ).callCount 1


    ajaxOptions = ajax.getCall( 0 ).args[ 0 ]

    expect( _.keys ajaxOptions ).eql [ 'method', 'url', 'success', 'complete' ]
    expect( ajaxOptions.url ).equal '/asd'
    expect( ajaxOptions.method ).equal 'GET'
    expect( ajaxOptions.unknown ).equal 34

    expect( ajax.getCall( 0 ).args ).eql {

      url: '/asd'
      method: 'GET'
      unknown: 34
      success:

    }


    TestReact.unmount component

  ##

  ###


  describe.skip 'redirects', ->

    hrefBefore = window.location.href

    beforeEach ->

      window.location.href = 'http://asd.bsa/'

    ##

    after ->

      window.location.href = hrefBefore

    ##

    variants = [

      false
      true
      ''
      '/asd'

    ]

    funced = [

      false
      true

    ]

    locations = [

      undefined
      'http://foo.bar/'

    ]

    _.each locations, ( location )->

      _.each funced, ( funced )->

        _.each variants, ( variant )->

          it JSON.stringify( location: location, variant: variant, funced: funced ), ->

            component = TestReact.render <Ajaxed />

            redirect = if funced then _.constant variant else variant

            component.sendAjax 'check', redirect: redirect

            xhr = getResponseHeader: _.constant location

            willChange = _.isString( variant ) || ( variant == true && location )

            if willChange

              $( 'body' ).one 'click', _.method 'preventDefault'

            ##

            $options.success undefined, undefined, xhr

            expect( window.location.href ).onlyIf( ! willChange ).equal 'http://asd.bsa/'

            TestReact.unmount component

          ##

        ##

      ##

    ##

  ##

##
