###
describe 'Ajax', ->

  Ajax = requireSubject()


  checks = [

    ->=

      i =
        unknown: 34
        url: 'asd'
        onSuccess: -> 1
        complete: -> 2

      input: i
      output: o

  ]


  it 'works', ->

    Ajaxed = TestMixin.createMixinClass Ajax


    component = TestReact.render <Ajaxed />


    abort = sinon.spy()

    ajax = sinon.stub $, 'ajax', ->=

      abort: abort


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
###
