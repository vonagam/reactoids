describe 'Button', ->

  $ = requireDependency 'jquery'

  Button = requireSubject()


  variants = {

    href: [ '', 'ihref' ]

    onClick: [ sinon.spy() ]

    ajax: [ {}, { a: 1 }, ( ->= {} ), ( ->= { a: 1 } ) ]

    children: [ 'ichildren' ]

    'data-unknown': [ 3 ]

  }


  itVariations 'renders [s]', variants, ( variation )->

    { href, children } = variation

    unknown = variation[ 'data-unknown' ]


    instance = shallow <Button {... variation } />


    expect( instance ).to.match 'a.button'

    expect( instance ).onlyIf( children ).to.have.prop 'children', children

    expect( instance ).onlyIf( unknown ).to.have.data 'unknown', unknown


    expect( instance ).onlyIf( _.isString href ).to.have.attr 'href', href


    enabled = _.isString( variation.href ) || variation.onClick || ! _.isEmpty _.funced variation.ajax

    expect( instance ).onlyIf( enabled ).to.have.className '-enabled'

    expect( instance ).onlyIf( ! enabled ).to.have.className '-disabled'

    expect( instance ).not.to.have.className '-waiting'

  ##


  options = {

    afterEach: ( variation )->

      variation.onClick.reset() if variation.onClick

    ##

  }

  itVariations 'responds to clicks [m]', variants, options, sinon.test ( variation )->

    sinon = this


    instance = mount <Button {... variation } />


    ajaxSpy = sinon.spy instance.node, 'sendAjax'

    ajaxStub = sinon.stub $, 'ajax', ->= { abort: _.noop }

    willAjax = ! _.isEmpty _.funced variation.ajax


    expect( instance.find 'a' ).not.to.have.className '-waiting'


    instance.simulate 'click'


    expect( ajaxSpy ).to.be.calledWith 'one', _.funced variation.ajax

    expect( ajaxStub ).to.have.callCount if willAjax then 1 else 0

    expect( instance.find 'a' ).onlyIf( willAjax ).to.have.className '-waiting'

    expect( variation.onClick ).to.be.calledOnce if variation.onClick

  ##

##
