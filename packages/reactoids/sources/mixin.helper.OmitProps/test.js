describe( 'mixin.helper.OmitProps', () => {

  defReactMixin( OmitPropsMixin );


  describe( '.constructor', () => {

    it( 'can be created without arguments', () =>

      expect( () => $createMixin() ).not.to.throw()

    );

    it( 'does return same instance', () =>

      expect( $createMixin() ).to.equal( $createMixin() )

    );

    it( 'can be mixed', () =>

      expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

    );

    it( 'can be mixed with itself', () =>

      expect( () => $checkMixing( $createMixin(), $createMixin() ) ).not.to.throw()

    );

    it( 'does return object with right properties', () =>

      expect( $createMixin() ).to.have.all.keys( 'propTypes', 'omitProps' )

    );

  } );

  describe( '#propTypes', () => {

    it( 'does have right keys', () =>

      expect( $mixin.propTypes ).to.have.all.keys( 'omitProps' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ { omitProps: [ 'string' ] }, true ],

      [ { omitProps: 'string' }, false ],

    ], ( [ props, truthy ] ) =>

      expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

    );

  } );

  describe( '#omitProps', () => {

    defFunc( 'omitProps', () => $component.omitProps() );

    def( 'additionals', {

      propTypes: {

        'direct': PropTypes.any,

      },

      mixins: [ {

        propTypes: {

          'mixed': PropTypes.any,

        },

      } ],

    } );


    contexts( 'with props = ${ doStringify( value.props ) }', [

      { props: {}, output: {} },

      { props: { direct: 1 }, output: {} },

      { props: { mixed: 2 }, output: {} },

      { props: { unknown: 3 }, output: { unknown: 3 } },

      { props: { direct: 1, mixed: 2, unknown: 3 }, output: { unknown: 3 } },

      { props: { direct: 1, mixed: 2, proped: 3, omitProps: [ 'proped' ] }, output: {} },

    ], ( { props, output } ) => {

      def( 'props', props );


      it( `does return ${ doStringify( output ) }`, () =>

        expect( $omitProps() ).to.be.eql( output )

      );

    } );

  } );

} );
