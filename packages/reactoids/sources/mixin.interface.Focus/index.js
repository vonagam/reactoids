export default FocusMixin = Mixin.create( {

  name: 'FocusMixin',

  argTypes: {

    findDOMNode: PropTypes.func // ( that: mixed ) => ?HTMLElement

  },

  defaultArgs: {

    findDOMNode: ( that ) => ReactDOM.findDOMNode( that ),

  },

  mixin( ARGS ) {

    return {

      getInitialState() {

        return { focused: false };

      },

      getInitialMembers() {

        return { _FocusMixin: false };

      },

      onFocusGain() {

        this._FocusMixin = true;

        this.setState( { focused: true } );

      },

      onFocusLoss() {

        this._FocusMixin = false;

        this.setState( { focused: false } );

      },

      findFocusables() {

        return Focus.findFocusables( ARGS.findDOMNode( this ) );

      },

      isFocusable() {

        let focusables = this.findFocusables();

        return focusables.length > 0;

      },

      isFocused() {

        return this._FocusMixin;

      },

      focus() {

        if ( this._FocusMixin ) return;

        Focus.focus( ARGS.findDOMNode( this ) );

      },

      blur() {

        if ( ! this._FocusMixin ) return;

        Focus.blur( ARGS.findDOMNode( this ) );

      },

    };

  },

} );
