import proxyquire from 'proxyquire';

proxyquire.noCallThru();


const BaseKeyMixinSpy = defMixinSpy( BaseKeyMixin, true );

const StateKeyMixin = proxyquire( './index', { '../mixin.meta.BaseKey': BaseKeyMixinSpy } ).default;

defReactMixin( StateKeyMixin );


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

    expect( $createMixin() ).to.have.all.keys( 'mixins' )

  );

} );

describe( '#mixins', () => {

  describe( 'BaseKeyMixin', () => {

    describe( 'name:', () => {

      it( 'is "state"', () =>

        expect( $BaseKeyMixinArgs ).to.include( { name: 'state' } )

      );

    } );

    describe( 'get:', () => {

      it( 'does return state', () => {

        let instance = {};

        let props = {};

        let state = {};

        expect( $BaseKeyMixinArgs.get( instance, props, state ) ).to.equal( state );

      } );

    } );

    describe( 'set:', () => {

      it( 'does set state', () => {

        let instance = { setState: spy() };

        let value = {};

        let callback = _.noop;

        $BaseKeyMixinArgs.set( instance, value, callback );

        expect( instance.setState ).to.be.calledOnce.and.be.calledWithExactly( value, callback );

      } );

    } );

  } );

} );
