defReactMixin(

  BaseViewMixin,

  () => ( {

    filterLink: stub().returns( $returns.filterLink ),

    handleLink: stub().returns( $returns.handleLink ),

    filterForm: stub().returns( $returns.filterForm ),

    handleForm: stub().returns( $returns.handleForm ),

  } ),

  () => ( {

    render() {

      let Tag = this.props.tag || 'div';

      return (

        <Tag>

          <a ref='link' />

          <form ref='form' />

        </Tag>

      );

    }

  } ),

);

def( 'returns', () => ( {

  filterLink: true,

  handleLink: true,

  filterForm: true,

  handleForm: true,

} ) );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'filterLink', 'handleLink', 'filterForm', 'handleForm' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'filterLink', 'handleLink', 'filterForm', 'handleForm' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { handleLink: _.noop }, true ],

    [ { handleLink: 3 }, false ],

    [ { filterLink: _.noop, handleLink: _.noop, filterForm: _.noop, handleForm: _.noop }, true ],

    [ { filterLink: 4, handleLink: _.noop }, false ],

    [ { handleLink: _.noop, handleForm: 5 }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [ { handleLink: _.noop }, { filterLink: _.noop, handleLink: _.noop, filterForm: _.noop, handleForm: _.noop } ], ( ARGS ) => {

    def( 'ARGS', ARGS );


    it( 'can be created', () =>

      expect( () => $createMixin() ).not.to.throw()

    );

    it( 'does return different instances', () =>

      expect( $createMixin() ).not.to.be.equal( $createMixin() )

    );

    it( 'can be mixed', () =>

      expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

    );

    it( 'can be mixed with itself', () =>

      expect( () => $checkMixing( $createMixin(), $createMixin() ) ).not.to.throw()

    );

    it( 'does return object with right properties', () =>

      expect( $createMixin() ).to.have.all.keys( 'mixins', 'getInitialMembers', 'componentDidMount', 'componentDidUpdate' )

    );

  } );

} );

describe( '#mixins', () => {

  it( 'does contain right mixins', () =>

    expect( $mixin.mixins ).to.have.members( [ EventListenerMixin() ] )

  );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_BaseViewMixin' )

  );

} );

describe( '#componentDidMount', () => {

  describe( 'link handling', () => {

    contexts( 'with hrefed: ${ value.hrefed }, filter: ${ value.filtered }, handle: ${ value.handled }',

      getVariations( { hrefed: [ false, true ], filtered: [ false, true ], handled: [ false, true ] } ),

      ( { hrefed, filtered, handled } ) => {

        def( 'link', () => $mount.ref( 'link' ) );

        if ( hrefed ) {

          beforeEach( 'set href', () => $link.href = '/href' );

        }

        def( 'returns', () => _.assign( $returns, { filterLink: filtered, handleLink: handled } ) );


        itIf( 'does check click', hrefed, ( truthy ) => {

          expect( () => $( $link ).trigger( 'click' ) ).to.alter( () => $ARGS.filterLink.callCount, { from: 0, to: +truthy } );

          if ( truthy ) {

            expect( $ARGS.filterLink ).to.be.calledWithExactly( $component, $link );

          }

        } );

        itIf( 'does handle click', hrefed && filtered, ( truthy ) => {

          let event = $.Event( 'click' );

          expect( () => $( $link ).trigger( event ) ).to.alter( () => $ARGS.handleLink.callCount, { from: 0, to: +truthy } );

          if ( truthy ) {

            expect( $ARGS.handleLink ).to.be.calledWithExactly( $component, $link );

            expect( event.isDefaultPrevented() ).to.be.equal( handled );

          }

        } );

        it( 'does not listen irrelevant events', () =>

          expect( () => $( $link ).trigger( 'mouseover' ) ).not.to.alter( () => $ARGS.filterLink.callCount + $ARGS.handleLink.callCount, { from: 0 } )

        );

      },

    );

  } );

  describe( 'form handling', () => {

    contexts( 'filter: ${ value.filtered }, handle: ${ value.handled }',

      getVariations( { filtered: [ false, true ], handled: [ false, true ] } ),

      ( { filtered, handled } ) => {

        def( 'form', () => $mount.ref( 'form' ) );

        def( 'returns', () => _.assign( $returns, { filterForm: filtered, handleForm: handled } ) );

        defSinon( 'submit', () => stub( $form, 'submit' ) );


        it( 'does check submit', () => {

          expect( () => $( $form ).trigger( 'submit' ) ).to.alter( () => $ARGS.filterForm.callCount, { from: 0, to: 1 } );

          expect( $ARGS.filterForm ).to.be.calledWithExactly( $component, $form );

        } );

        itIf( 'does handle submit', filtered, ( truthy ) => {

          let event = $.Event( 'submit' );

          expect( () => $( $form ).trigger( event ) ).to.alter( () => $ARGS.handleForm.callCount, { from: 0, to: +truthy } );

          if ( truthy ) {

            expect( $ARGS.handleForm ).to.be.calledWithExactly( $component, $form );

            expect( event.isDefaultPrevented() ).to.be.equal( handled );

            expect( $submit ).to.have.callCount( 1 - handled );

          }

        } );

        it( 'does not listen irrelevant events', () =>

          expect( () => $( $form ).trigger( 'mouseover' ) ).not.to.alter( () => $ARGS.filterForm.callCount + $ARGS.handleForm.callCount, { from: 0 } )

        );

      },

    );

  } );

} );

describe( '#componentDidUpdate', () => {

  contexts( {

    'without node change': false,

    'with node change': true,

  }, ( change ) => {

    itIf( 'does update listeners', change, ( truthy ) => {

      let remove = spy( $component, 'removeEventListener' );

      let add = spy( $component, 'addEventListener' );

      expect( () => $mount.setProps( { tag: truthy ? 'section' : 'div' } ) ).onlyIf( truthy ).to.alter( () => remove.callCount + add.callCount, { from: 0 } );

      if ( truthy ) {

        expect( remove ).to.have.callCount( 2 ).and.be.calledWith( 'BaseViewMixin.link' ).and.be.calledWith( 'BaseViewMixin.form' );

        expect( add ).to.have.callCount( 2 ).and.be.calledWith( 'BaseViewMixin.link' ).and.be.calledWith( 'BaseViewMixin.form' );

      }

    } );

  } );

} );
