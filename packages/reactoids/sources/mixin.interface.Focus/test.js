describe( 'mixin.Focus', () => {

  defReactMixin( FocusMixin );


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

      expect( $createMixin() ).to.have.all.keys( 'getInitialState', 'getInitialMembers', 'onFocusGain', 'onFocusLoss', 'isFocusable', 'isFocused', 'focus', 'blur' )

    );

  } );

  describe( '#getInitialState', () => {

    it( 'does provide initial state for right keys', () =>

      expect( $mixin.getInitialState() ).to.include( { focused: false } )

    );

  } );

  describe( '#getInitialMembers', () => {

    it( 'does contain mixin private state', () =>

      expect( $mixin.getInitialMembers() ).to.have.property( '_FocusMixin' )

    );

  } );

  describe( '#onFocusGain', () => {

    def( 'instance', () => ( { setState: spy() } ) );

    defFunc( 'onFocusGain', () => $mixin.onFocusGain.call( $instance ) );


    it( 'does set focus state to true', () => {

      expect( () => $onFocusGain() ).to.alter( () => $instance.setState.callCount, { from: 0 } );

      expect( $instance.setState ).to.be.calledOnce.and.be.calledWithMatch( { focused: true } );

    } );

  } );

  describe( '#onFocusLoss', () => {

    def( 'instance', () => ( { setState: spy() } ) );

    defFunc( 'onFocusLoss', () => $mixin.onFocusLoss.call( $instance ) );


    it( 'does set focus state to true', () => {

      expect( () => $onFocusLoss() ).to.alter( () => $instance.setState.callCount, { from: 0 } );

      expect( $instance.setState ).to.be.calledOnce.and.be.calledWithMatch( { focused: false } );

    } );

  } );

  describe( '#isFocusable', () => {

    contexts( {

      'null': { focusable: false, render: () => null },

      'div': { focusable: false, render: () => <div /> },

      'input': { focusable: true, render: () => <input /> },

      'div with input': { focusable: true, render: () => <div><input /></div> },

      'div with tabindex': { focusable: true, render: () => <div tabIndex='0' /> },

    }, ( { focusable, render } ) => {

      def( 'additionals', { render } );


      itIf( 'does return true', focusable, ( truthy ) =>

        expect( $component.isFocusable() ).to.be.equal( truthy )

      );

    } );

  } );

  describe( '#isFocused', () => {

    contexts( {

      'starting state': 0,

      'after focus': 1,

      'after blur': 2,

    }, ( state ) => {

      if ( state > 0 ) {

        beforeEach( 'focus', () => $component.onFocusGain() );

      }

      if ( state > 1 ) {

        beforeEach( 'blur', () => $component.onFocusLoss() );

      }


      itIf( 'does return true', state === 1, ( truthy ) =>

        expect( $component.isFocused() ).to.be.equal( truthy )

      );

    } );

  } );

  // https://github.com/airbnb/enzyme/issues/1551
  // https://github.com/airbnb/enzyme/issues/1134

  // describe( '#focus', () => {

  //   contexts( {

  //     'null': { focusable: false, render: () => null },

  //     'div': { focusable: false, render() { return <div onFocus={ () => this.onFocusGain() } onBlur={ () => this.onFocusLoss() } ref='node' /> } },

  //     'input': { focusable: true, render() {

  //       return <input onFocus={ () => console.log( 'gain' ) } onBlur={ () => console.log( 'loss' ) } ref='node' />

  //     } },

  //     'div with input': { focusable: true, render() { return <div onFocus={ () => this.onFocusGain() } onBlur={ () => this.onFocusLoss() }><input ref='node' /></div> } },

  //     'div with tabindex': { focusable: true, render() { return <div onFocus={ () => this.onFocusGain() } onBlur={ () => this.onFocusLoss() } tabIndex='0' ref='node' /> } },

  //   }, ( { focusable, render } ) => {

  //     def( 'additionals', { render } );


  //     contexts( {

  //       'with focus': true,

  //       'without focus': false,

  //     }, ( focus ) => {

  //       if ( focus ) {

  //         beforeEach( 'focus', () => $component.focus() );

  //       }


  //       itIf( 'does focuses node', focusable && ! focus, () => {

  //         expect( $component.isFocused() ).to.be.equal( focusable && focus );

  //         expect( () => $component.focus() ).onlyIf( focusable && ! focus ).to.alter( () => document.activeElement );

  //         expect( $component.isFocused() ).to.be.equal( focusable );

  //         if ( focusable ) {

  //           expect( $mount.ref( 'node' ) ).to.be.equal( document.activeElement );

  //         }

  //       } );

  //     } );

  //   } );

  // } );

} );
