describe 'Form', ->

  $ = requireDependency 'jquery'

  Form = requireSubject()


  it 'renders [s]', ->

    node = <div>random</div>

    render = _.constant node

    instance = shallow <Form ajax={ {} } children={ render } />

    expect( instance.equals node ).to.be true

  ##

  it 'works [m]', sinon.test ( done )->

    sinon = this


    options = undefined

    ajaxStub = sinon.stub $, 'ajax', ( _options )->=

      options = _options

      { abort: _.noop }

    ##


    results = '_results_'

    props = {

      'ajax': {

        'beforeSend': sinon.spy()

        'complete': sinon.spy()

      }

      'getSubmitResults': _.constant results

      'onSubmit': sinon.spy()

      'onComplete': sinon.spy()

      'children': ( form, { results, submitting } )->=

        <div

          className={ if submitting then '-submitting' else '' }

          onClick={ form.submit }

          children={ results }

        />

      ##

    }


    instance = mount <Form {... props } />



    Promise.resolve()

    .then ->=

      whenPromised [

        expect( ->= props.onSubmit.callCount ).to.change.to( 1 )

        expect( ->= props.ajax.beforeSend.callCount ).to.change.to( 1 )

        expect( ->= ajaxStub.callCount ).to.change.to( 1 )

        expect( ->= instance.find( 'div' ).hasClass '-submitting' ).to.change.from( false ).to( true )

      ], ->

        instance.find( 'div' ).simulate 'click'

        options.beforeSend()

      ##

    .then ->=

      whenPromised [

        expect( ->= props.onComplete.callCount ).to.change.to( 1 )

        expect( ->= props.ajax.complete.callCount ).to.change.to( 1 )

        expect( ->= instance.find( 'div' ).prop 'children' ).to.change.from( undefined ).to( results )

        expect( ->= instance.find( 'div' ).hasClass '-submitting' ).to.change.from( true ).to( false )

      ], ->

        options.complete()

      ##

    .then done

  ##

##
