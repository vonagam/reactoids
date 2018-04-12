import findTabbables from 'tabbable';


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

      findTabbables() {

        let dom = ARGS.findDOMNode( this );

        if ( ! dom ) return [];

        let tabbables = findTabbables( dom, { includeContainer: true } );

        return tabbables;

      },

      isFocusable() {

        let tabbables = this.findTabbables();

        return tabbables.length > 0;

      },

      isFocused() {

        return this._FocusMixin;

      },

      focus() {

        if ( this._FocusMixin ) return;

        let tabbables = this.findTabbables();

        if ( tabbables.length === 0 ) return;

        tabbables[ 0 ].focus();

      },

      blur() {

        if ( ! this._FocusMixin ) return;

        let dom = ARGS.findDOMNode( this );

        if ( ! dom ) return;

        let focused = document.activeElement;

        if ( ! focused || ! dom.contains( focused ) ) return;

        focused.blur();

      },

    };

  },

} );
