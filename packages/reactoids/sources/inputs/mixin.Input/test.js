// skip


import proxyquire from 'proxyquire';

proxyquire.noCallThru();


const BaseKeyMixinSpy = defMixinSpy( BaseKeyMixin );

const InputMixin = proxyquire( './index', { '../mixin.meta.BaseKey': BaseKeyMixinSpy } ).default;

defReactMixin( InputMixin );

defSinon( 'window', () => ( {

  setTimeout: stub( window, 'setTimeout' ),

  clearTimeout: stub( window, 'clearTimeout' ),

} ) );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'valueType', 'defaultValue', 'inputDelay', 'validateValue', 'setCustomValidity' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'valueType', 'defaultValue', 'inputDelay', 'validateValue', 'setCustomValidity' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { valueType: _.noop, defaultValue: 1, validateValue: _.noop, inputDelay: 1 }, true ],

    [ { valueType: _.noop, defaultValue: 1, validateValue: 'string', inputDelay: 1 }, false ],

    [ { valueType: _.noop, defaultValue: 1, validateValue: _.noop, inputDelay: '1' }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [

    {},

    { valueType: _.noop, defaultValue: 1, validateValue: _.noop, inputDelay: 1 },

  ], ( ARGS ) => {

    def( 'ARGS', ARGS );


    it( 'can be created', () =>

      expect( () => $createMixin() ).not.to.throw()

    );

    it( 'does return different instances', () =>

      expect( $createMixin() ).not.to.equal( $createMixin() )

    );

    it( 'can be mixed', () =>

      expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

    );

    it( 'cannot be mixed with itself', () =>

      expect( () => $checkMixing( $createMixin(), $createMixin() ) ).to.throw()

    );

    it( 'does return object with right properties', () =>

      expect( $createMixin() ).to.have.all.keys(

        'mixins',

        'propTypes',

        'defaultProps',

        'getInitialState',

        'getInitialMembers',

        'componentDidMount',

        'componentWillReceiveProps',

        'componentDidUpdate',

        'componentWillUnmount',

        'getValue',

        'setValue',

        'setTempValue',

        'getValueError',

      )

    );

  } );

} );

describe( '#mixins', () => {

  it( 'does contain right mixins', () =>

    expect( $mixin.mixins ).to.have.members( [ BaseKeyMixinSpy.lastCall.returnValue, FocusMixin() ] )

  );


  describe( 'BaseKeyMixin', () => {

    describe( 'name:', () => {

      it( 'is "value"', () =>

        expect( $BaseKeyMixinArgs ).to.include( { name: 'value' } )

      );

    } );

    describe( 'get:', () => {

      it( 'does uses getValue', () => {

        let instance = { getValue: stub().returns( {} ) };

        let props = {};

        let state = {};

        expect( $BaseKeyMixinArgs.get( instance, props, state ) ).to.equal( instance.getValue.lastCall.returnValue );

        expect( instance.getValue ).to.be.calledOnce.and.calledWithExactly( props, state );

      } );

    } );

    describe( 'set:', () => {

      it( 'does uses getValue', () => {

        let instance = { setValue: spy() };

        let value = {};

        let callback = () => {};

        $BaseKeyMixinArgs.set( instance, value, callback );

        expect( instance.setValue ).to.be.calledOnce.and.calledWithExactly( value, callback );

      } );

    } );

  } );

} );

describe( '#propTypes', () => {

  it( 'does have right keys', () =>

    expect( $mixin.propTypes ).to.have.all.keys( 'value', 'defaultValue', 'onChange', 'onTempChange', 'inputDelay', 'readOnly', 'disabled', 'validate' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $mixin.defaultProps ).to.include( { defaultValue: $ARGS.defaultValue, inputDelay: _.defaultTo( $ARGS.inputDelay, $Mixin.defaultArgs.inputDelay ) } )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { value: 'x', defaultValue: 'y', onChange: _.noop, onTempChange: _.noop, inputDelay: 2, readOnly: true, disabled: false, validate: _.noop }, true ],

    [ { validate: 'error' }, true ],

    [ { onChange: 1 }, false ],

    [ { onTempChange: 1 }, false ],

    [ { inputDelay: '2' }, false ],

    [ { readOnly: 1 }, false ],

    [ { disabled: 2 }, false ],

    [ { validate: 3 }, false ],

  ], ( [ props, truthy ] ) =>

    expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 1 ] ) } with args = ${ doStringify( value[ 0 ] ) }`, value[ 2 ] ), [

    [ { valueType: PropTypes.number }, { value: 1 }, true ],

    [ { valueType: PropTypes.number }, { value: 'x' }, false ],

  ], ( [ ARGS, props, truthy ] ) => {

    _.assign( $ARGS, ARGS );

    expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes );

  } );

} );

describe( '#getInitialState', () => {

  it( 'does provide initial state for right keys', () =>

    expect( $mixin.getInitialState.call( { props: {}, getValue: _.noop } ) ).to.include( { valueTemp: undefined, valueReal: undefined } )

  );

  its( 'does set valueError to ${ doStringify( value[ 2 ] ) } with args = ${ doStringify( value[ 0 ] ) } and props = ${ doStringify( value[ 1 ] ) }', [

    [ {}, {}, undefined ],

    [ { validateValue: _.noop }, {}, undefined ],

    [ { validateValue: () => 'arg' }, {}, 'arg' ],

    [ {}, { validate: 'prop_string' }, 'prop_string' ],

    [ {}, { validate: () => 'prop_func' }, 'prop_func' ],

    [ { validateValue: () => 'arg' },  { validate: 'prop_string' }, 'prop_string' ],

    [ { validateValue: () => 'arg' }, { validate: () => 'prop_func' }, 'prop_func' ],

  ], ( [ ARGS, props, valueError ] ) => {

    _.assign( $ARGS, ARGS );

    expect( $mixin.getInitialState.call( { props, getValue: _.noop } ) ).to.include( { valueError } );

  } );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_InputMixin' )

  );

} );

describe( '#componentDidMount', () => {

  it.skip( 'does need tests' );

} );

describe( '#componentWillReceiveProps', () => {

  contexts( 'with prev props = ${ doStringify( value[ 0 ] ) } and next props = ${ doStringify( value[ 1 ] ) }', [

    [ {}, { value: '1' }, 'all' ],

    [ { value: '1' }, { value: '2', validate: 'x' }, 'all' ],

    [ {}, {}, false ],

    [ { value: '1' }, { value: '1', validate: 'x' }, 'error' ],

    [ { value: '1', validate: 'x' }, { value: '1', validate: 'x' }, false ],

  ], ( [ prevProps, nextProps, change ] ) => {

    def( 'instance', () => ( { props: prevProps, state: {}, setState: spy(), getValue: _.noop } ) );


    itIf( 'does reset state', Boolean( change ), ( truthy ) => {

      expect( () => $mixin.componentWillReceiveProps.call( $instance, nextProps ) ).to.alter( () => $instance.setState.callCount, { from: 0, to: +truthy } );

      if ( change === 'all' ) {

        expect( $instance.setState ).to.be.calledWithMatch( { valueTemp: undefined, valueReal: undefined, valueError: nextProps.validate } );

      }

      if ( change === 'error' ) {

        expect( $instance.setState ).to.be.calledWithMatch( { valueError: nextProps.validate } );

      }

    } );

  } );

} );

describe( '#componentDidUpdate', () => {

  it.skip( 'does need tests' );

} );

describe( '#componentWillUnmount', () => {

  it( 'does work', () =>

    expect( () => $mount.unmount() ).not.to.throw()

  );

} );

describe( '#getValue', () => {

  defFunc( 'getValue', ( ...args ) => $component.getValue( ...args ) );


  contexts( ( { value } ) => value ? 'from context' : 'from arguments', [ false, true ], ( isContext ) => {

    its( 'does return ${ doStringify( value.result ) } for props = ${ doStringify( value.props ) } and state = ${ doStringify( value.state ) }', [

      { props: {}, state: {}, result: undefined },

      { props: { value: 'pro_val' }, state: {}, result: 'pro_val' },

      { props: { defaultValue: 'pro_def' }, state: {}, result: 'pro_def' },

      { props: {}, state: { valueTemp: 'sta_tem' }, result: 'sta_tem' },

      { props: {}, state: { valueReal: 'sta_rea' }, result: 'sta_rea' },

      { props: { value: 'pro_val', defaultValue: 'pro_def' }, state: {}, result: 'pro_val' },

      { props: { value: 'pro_val' }, state: { valueTemp: 'sta_tem' }, result: 'sta_tem' },

      { props: { value: 'pro_val' }, state: { valueReal: 'sta_rea' }, result: 'pro_val' },

      { props: {}, state: { valueTemp: 'sta_tem', valueReal: 'sta_rea' }, result: 'sta_tem' },

      { props: { value: 'pro_val', defaultValue: 'pro_def' }, state: { valueTemp: 'sta_tem', valueReal: 'sta_rea' }, result: 'sta_tem' },

    ], ( { props, state, result } ) => {

      if ( isContext ) {

        $mount.setProps( props );

        $mount.setState( state );

        expect( $getValue() ).to.be.equal( result );

      } else {

        $mount.setProps( { value: 1, defaultValue: 2 } );

        $mount.setState( { valueTemp: 3, valueReal: 4 } );

        expect( $getValue( props, state ) ).to.be.equal( result );

      }

    } );

  } );

} );

describe( '#setValue', () => {

  defFunc( 'setValue', () => $component.setValue( $value, $callback ) );

  def( 'value', { key: 'value' } );

  defSinon( 'callback', spy() );

  defSinon( 'onChange', spy() );

  defSinon( 'onTempChange', spy() );


  contexts( 'with props = ${ doStringify( value ) }', [

    {},

    { readOnly: true },

    { disabled: true },

  ], ( props ) => {

    let active = ! props.readOnly && ! props.disabled;

    def( 'props', () => _.assign( { onChange: $onChange, onTempChange: $onTempChange }, props ) );


    itIf( 'does call callback', active, ( truthy ) =>

      expect( () => $setValue() ).to.alter( () => $callback.callCount, { from: 0, to: +truthy } )

    );

    itIf( 'does call props.onChange with provided value', active, ( truthy ) => {

      expect( () => $setValue() ).to.alter( () => $onChange.callCount, { from: 0, to: +truthy } );

      expect( $onChange ).onlyIf( truthy ).to.be.calledWithExactly( $value );

    } );

    it( 'does not call props.onTempChange', () =>

      expect( () => $setValue() ).not.to.alter( () => $onTempChange.callCount, { from: 0 } )

    );

    itIf( 'does set state.valueReal to provided value', active, ( truthy ) =>

      expect( () => $setValue() ).onlyIf( truthy ).to.alter( () => $mount.state( 'valueReal' ), { from: undefined, to: $value } )

    );

    itIf( 'does set state.valueTemp to undefined', active, ( truthy ) => {

      $mount.setState( { valueTemp: 'something' } );

      $setValue();

      _.invoke( $window.setTimeout, 'lastCall.args.0' );

      expect( $mount.state( 'valueTemp' ) ).to.be.equal( truthy ? undefined : 'something' );

    } );


    contexts( 'with validate = ${ key }', {

      undefined: undefined,

      string: 'problem',

      funcedUndefined: spy( () => undefined ),

      funcedString: spy( ( value ) => _.get( value.key ) ),

    }, ( validate ) => {

      defSinon( 'validate', validate );

      def( 'props', () => _.assign( { validate }, $props ) );


      itIf( 'does update state.valueError', active, ( truthy ) => {

        $setValue();

        let result = validate;

        if ( _.isFunction( validate ) ) {

          expect( validate ).to.have.callCount( 1 + truthy ).and.onlyIf( truthy ).to.be.calledWithExactly( $component, $value );

          result = validate.lastCall.returnValue;

        }

        expect( $mount.state( 'valueError' ) ).to.be.equal( result );

      } );

    } );

  } );

} );

describe( '#setTempValue', () => {

  defFunc( 'setTempValue', () => $component.setTempValue( $value, $callback ) );

  defSinon( 'setValue', () => stub( $component, 'setValue' ).callsFake( ( value, callback ) => callback && callback() ) );

  def( 'value', { key: 'value' } );

  defSinon( 'callback', spy() );

  defSinon( 'onChange', spy() );

  defSinon( 'onTempChange', spy() );


  contexts( 'with props = ${ doStringify( value ) }', [

    {},

    { inputDelay: 1 },

    { inputDelay: 0 },

    { inputDelay: -1 },

    { readOnly: true },

    { disabled: true },

  ], ( props ) => {

    let active = ! props.readOnly && ! props.disabled;

    let inputDelay = props.inputDelay;

    def( 'props', () => _.assign( { onChange: $onChange, onTempChange: $onTempChange }, props ) );


    itIf( 'does call callback', active, ( truthy ) =>

      expect( () => $setTempValue() ).to.alter( () => $callback.callCount, { from: 0, to: +truthy } )

    );

    itIf( 'does call props.onTempChange with provided value', active && inputDelay !== 0, ( truthy ) => {

      expect( () => $setTempValue() ).to.alter( () => $onTempChange.callCount, { from: 0, to: +truthy } );

      expect( $onTempChange ).onlyIf( truthy ).to.be.calledWithExactly( $value );

    } );

    itIf( 'does call setValue with provided arguments without delay', active && inputDelay === 0, ( truthy ) => {

      expect( () => $setTempValue() ).to.alter( () => $setValue.callCount, { from: 0, to: +truthy } );

      expect( $setValue ).onlyIf( truthy ).to.be.calledWithExactly( $value, $callback );

    } );

    itIf( 'does set state.valueTemp to provided value', active && inputDelay !== 0, ( truthy ) =>

      expect( () => $setTempValue() ).onlyIf( truthy ).to.alter( () => $mount.state( 'valueTemp' ), { from: undefined, to: $value } )

    );

    itIf( 'does call setValue with provided value after delay', active && ( inputDelay === undefined || inputDelay > 0 ), ( truthy ) => {

      $setTempValue();

      $setValue.resetHistory();

      expect( $window.setTimeout ).to.have.callCount( +truthy );

      if ( truthy ) {

        expect( $window.setTimeout ).to.be.calledWith( smatch.func, _.defaultTo( $props.inputDelay, $Mixin.defaultArgs.inputDelay ) );

        $window.setTimeout.lastCall.args[ 0 ]();

      }

      expect( $setValue ).to.have.callCount( +truthy ).and.onlyIf( truthy ).be.calledWithExactly( $value );

    } );

  } );

} );

describe( '#getValueError', () => {

  it( 'does return state.valueError', () =>

    expect( $mixin.getValueError.call( { state: { valueError: 'x' } } ) ).to.be.equal( 'x' )

  );

} );
