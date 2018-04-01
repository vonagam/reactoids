import findTabbables from 'tabbable';


export default FocusMixin = Mixin.create( {

  name: 'FocusMixin',

  mixin: _.once( () => {

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

      isFocusable() {

        let dom = ReactDOM.findDOMNode( this );

        if ( ! dom ) return false;

        let tabbables = findTabbables( dom, { includeContainer: true } );

        return tabbables.length > 0;

      },

      isFocused() {

        return this._FocusMixin;

      },

      focus() {

        if ( this._FocusMixin ) return;

        let dom = ReactDOM.findDOMNode( this );

        if ( ! dom ) return;

        let tabbables = findTabbables( dom, { includeContainer: true } );

        if ( tabbables.length === 0 ) return;

        tabbables[ 0 ].focus();

      },

      blur() {

        if ( ! this._FocusMixin ) return;

        let dom = ReactDOM.findDOMNode( this );

        if ( ! dom ) return;

        let focused = document.activeElement;

        if ( ! focused || ! dom.contains( focused ) ) return;

        focused.blur();

      },

    };

  } ),

} );
