describe 'Processed', ->

  Processed = requireSubject()


  variants = {

    tag: [ 'div', 'span' ]

    source: [ 2, '3', { x: 1 } ]

    process: [ sinon.spy ( source )->= 'x' + JSON.stringify source ]

    'data-unknown': [ 3 ]

  }

  options = {

    skip: ( variation )->=

      _.isUndefined variation.process

    ##

    afterEach: ( variation )->

      variation.process.reset()

    ##

  }


  itVariations 'renders processed source inside specified tag [s]', variants, options, ( variation )->

    { tag, source, process } = variation


    instance = shallow <Processed {... variation } />


    expect( instance ).to.have.tagName tag || 'div'

    expect( instance ).to.have.className 'processed'

    expect( instance ).onlyIf( variation[ 'data-unknown' ] ).to.have.data 'unknown', variation[ 'data-unknown' ]

    expect( instance ).to.have.prop( 'dangerouslySetInnerHTML' ).deep.equal __html: process source

  ##

  itVariations 'updates text only if source or process function have changed [m]', variants, options, ( variation )->

    { process } = variation


    instance = mount <Processed {... variation } />


    expect( ->= process.callCount ).to.not.change.when -> instance.setProps {}

    expect( ->= process.callCount ).to.change.by( 1 ).when -> instance.setProps { source: 'other' }

  ##

##
